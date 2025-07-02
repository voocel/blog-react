// 全局导航事件系统
type NavigationHandler = (path: string) => void;

class NavigationManager {
  private navigationHandler: NavigationHandler | null = null;

  // 注册导航处理器
  setNavigationHandler(handler: NavigationHandler) {
    this.navigationHandler = handler;
  }

  // 清除导航处理器
  clearNavigationHandler() {
    this.navigationHandler = null;
  }

  // 执行导航
  navigate(path: string) {
    if (this.navigationHandler) {
      this.navigationHandler(path);
    } else {
      // 如果没有注册处理器，回退到传统方式
      console.warn('NavigationHandler not registered, using window.location');
      window.location.href = path;
    }
  }

  // 强制刷新（某些情况下需要）
  forceNavigate(path: string) {
    window.location.href = path;
  }
}

// 导出单例实例
export const navigationManager = new NavigationManager(); 