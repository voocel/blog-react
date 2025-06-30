import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ 
  value, 
  onChange, 
  placeholder = "选择发布时间" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0 });
  const [activeTab, setActiveTab] = useState<'date' | 'time'>('date');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value && value !== placeholder) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setCurrentMonth(date);
        setSelectedTime({
          hour: date.getHours(),
          minute: date.getMinutes()
        });
      }
    }
  }, [value, placeholder]);

  const formatDisplayValue = () => {
    if (!value || value === placeholder) {
      return placeholder;
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return placeholder;
    }
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, daysInPrevMonth - i)
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day)
      });
    }

    return days;
  };

  const createAndUpdateDateTime = (date: Date, time: { hour: number; minute: number }) => {
    const newDate = new Date(date);
    newDate.setHours(time.hour, time.minute, 0, 0);
    const isoString = newDate.toISOString().slice(0, 16);
    onChange(isoString);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    createAndUpdateDateTime(date, selectedTime);
  };

  const handleHourChange = (newHour: number) => {
    const newTime = { ...selectedTime, hour: newHour };
    setSelectedTime(newTime);
    createAndUpdateDateTime(selectedDate, newTime);
  };

  const handleMinuteChange = (newMinute: number) => {
    const newTime = { ...selectedTime, minute: newMinute };
    setSelectedTime(newTime);
    createAndUpdateDateTime(selectedDate, newTime);
  };

  const setQuickTime = (hour: number, minute: number) => {
    const newTime = { hour, minute };
    setSelectedTime(newTime);
    createAndUpdateDateTime(selectedDate, newTime);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const clearValue = () => {
    onChange('');
    setIsOpen(false);
  };

  const setToNow = () => {
    const now = new Date();
    setSelectedDate(now);
    setSelectedTime({ hour: now.getHours(), minute: now.getMinutes() });
    setCurrentMonth(now);
    
    const isoString = now.toISOString().slice(0, 16);
    onChange(isoString);
  };

  const quickDateOptions = [
    { label: '今天', action: () => {
      const today = new Date();
      setSelectedDate(today);
      setCurrentMonth(today);
      createAndUpdateDateTime(today, selectedTime);
    }},
    { label: '明天', action: () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow);
      setCurrentMonth(tomorrow);
      createAndUpdateDateTime(tomorrow, selectedTime);
    }},
    { label: '下周', action: () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setSelectedDate(nextWeek);
      setCurrentMonth(nextWeek);
      createAndUpdateDateTime(nextWeek, selectedTime);
    }},
    { label: '下个月', action: () => {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setSelectedDate(nextMonth);
      setCurrentMonth(nextMonth);
      createAndUpdateDateTime(nextMonth, selectedTime);
    }}
  ];

  const calendarDays = generateCalendarDays();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 text-left border rounded-lg bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 flex items-center justify-between shadow-sm ${
            isOpen ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-gray-300'
          }`}
        >
          <span className={value && value !== placeholder ? 'text-gray-900' : 'text-gray-500'}>
            {formatDisplayValue()}
          </span>
          <div className="flex items-center space-x-2">
            {value && value !== placeholder && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearValue();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden w-96">
          <div className="flex bg-gray-50 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('date')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'date'
                  ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              日期
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('time')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'time'
                  ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              时间
            </button>
          </div>

          {activeTab === 'date' && (
            <div className="p-4">
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {quickDateOptions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={option.action}
                      className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="font-semibold text-gray-900">
                  {currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
                </h3>
                <button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayInfo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(dayInfo.date)}
                    className={`
                      relative p-2 text-sm rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium
                      ${!dayInfo.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                      ${isSelected(dayInfo.date) ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' : ''}
                      ${isToday(dayInfo.date) && !isSelected(dayInfo.date) ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-200' : ''}
                    `}
                  >
                    {dayInfo.day}
                    {isToday(dayInfo.date) && !isSelected(dayInfo.date) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'time' && (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedTime.hour.toString().padStart(2, '0')}:
                  {selectedTime.minute.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-500">
                  {selectedDate.toLocaleDateString('zh-CN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    小时: {selectedTime.hour.toString().padStart(2, '0')}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="23"
                    value={selectedTime.hour}
                    onChange={(e) => handleHourChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hour-slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>00</span>
                    <span>12</span>
                    <span>23</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    分钟: {selectedTime.minute.toString().padStart(2, '0')}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="59"
                    value={selectedTime.minute}
                    onChange={(e) => handleMinuteChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer minute-slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>00</span>
                    <span>30</span>
                    <span>59</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: '00:00', hour: 0, minute: 0 },
                    { label: '09:00', hour: 9, minute: 0 },
                    { label: '12:00', hour: 12, minute: 0 },
                    { label: '18:00', hour: 18, minute: 0 }
                  ].map((timeOption) => (
                    <button
                      key={timeOption.label}
                      type="button"
                      onClick={() => setQuickTime(timeOption.hour, timeOption.minute)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        selectedTime.hour === timeOption.hour && selectedTime.minute === timeOption.minute
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {timeOption.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-200">
            <button
              type="button"
              onClick={setToNow}
              className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
            >
              现在
            </button>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hour-slider {
          background: linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(selectedTime.hour / 23) * 100}%, #e5e7eb ${(selectedTime.hour / 23) * 100}%, #e5e7eb 100%) !important;
        }

        .minute-slider {
          background: linear-gradient(to right, #10b981 0%, #10b981 ${(selectedTime.minute / 59) * 100}%, #e5e7eb ${(selectedTime.minute / 59) * 100}%, #e5e7eb 100%) !important;
        }

        .hour-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }

        .minute-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }

        .hour-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }

        .minute-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default DateTimePicker;