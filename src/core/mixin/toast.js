import Toast from '@/components/toast/Toast.vue';
import Vue from 'vue';

/**
 * @desc 导入options
 */
export default {
  data() {
    return {
      // 内部变量
      toastMixinToastInstance: null,
      toastMixinTimer: null,
    };
  },
  methods: {
    // 内部方法
    /**
     * @description 创建toast APP对象
     */
    toastMixinCreateToast(message) {
      const ToastConstructor = Vue.extend(Toast);
      this.toastRef = new ToastConstructor({
        propsData: {
          message,
          position: this.options.toastPlacement,
        },
      });
    },
    // 外部方法
    // 显示Toast
    showToast(message,  duration = 2000) {
      if (this.options.showToast) {
        // 如果之前已有Toast则先清除
        if (this.toastMixinTimer) {
          clearTimeout(this.toastMixinTimer);
          this.closeToast();
        }
        const container = document.getElementById('cy-player-container');
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        container.appendChild(toastContainer);

        this.toastMixinCreateToast(message);
        this.toastMixinToastInstance.$mount(toastContainer);  // 挂载组件

        // 设置定时器，过一段时间后卸载Toast
        this.toastMixinTimer = setTimeout(() => {
          this.closeToast();
        }, duration);
      }
    },
    // 关闭Toast
    closeToast() {
      if (this.toastMixinToastInstance) {
        this.toastMixinToastInstance.$destroy();
        this.toastMixinToastInstance.$el.parentNode.removeChild(this.toastMixinToastInstance.$el);
      }
      this.toastMixinToastInstance = null;
    }
  },
};
