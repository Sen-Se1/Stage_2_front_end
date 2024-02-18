import {
    DialogLayoutDisplay,
    DisappearanceAnimation,
    AppearanceAnimation,
    ToastPositionEnum,
    ToastUserViewTypeEnum,
    ToastProgressBarEnum,
    ToastNotificationInitializer
} from '@costlydeveloper/ngx-awesome-popup';
export class alert {
    success(title: string = '', message: string) {
        const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle(title);
        newToastNotification.setMessage(message);

        // Choose layout color type
        newToastNotification.setConfig({
            autoCloseDelay: 5000, // optional
            textPosition: 'left', // optional
            layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
            progressBar: ToastProgressBarEnum.DECREASE, // INCREASE | DECREASE | NONE
            toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
            toastPosition: ToastPositionEnum.TOP_RIGHT,
            allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
    }
    info(title: string = '', message: string) {
        const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle(title);
        newToastNotification.setMessage(message);

        // Choose layout color type
        newToastNotification.setConfig({
            autoCloseDelay: 5000, // optional
            textPosition: 'left', // optional
            layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
            progressBar: ToastProgressBarEnum.DECREASE, // INCREASE | DECREASE | NONE
            toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
            toastPosition: ToastPositionEnum.TOP_RIGHT,
            allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
    }
    none(title: string = '', message: string) {
        const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle(title);
        newToastNotification.setMessage(message);

        // Choose layout color type
        newToastNotification.setConfig({
            autoCloseDelay: 5000, // optional
            textPosition: 'left', // optional
            layoutType: DialogLayoutDisplay.NONE, // SUCCESS | INFO | NONE | DANGER | WARNING
            progressBar: ToastProgressBarEnum.DECREASE, // INCREASE | DECREASE | NONE
            toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
            toastPosition: ToastPositionEnum.TOP_RIGHT,
            allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
    }
    danger(title: string = '', message: string) {
        const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle(title);
        newToastNotification.setMessage(message);

        // Choose layout color type
        newToastNotification.setConfig({
            autoCloseDelay: 5000, // optional
            textPosition: 'left', // optional
            layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
            progressBar: ToastProgressBarEnum.DECREASE, // INCREASE | DECREASE | NONE
            toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
            toastPosition: ToastPositionEnum.TOP_RIGHT,
            allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
    }
    warning(title: string = '', message: string) {
        const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle(title);
        newToastNotification.setMessage(message);

        // Choose layout color type
        newToastNotification.setConfig({
            autoCloseDelay: 5000, // optional
            textPosition: 'left', // optional
            layoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
            progressBar: ToastProgressBarEnum.DECREASE, // INCREASE | DECREASE | NONE
            toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
            toastPosition: ToastPositionEnum.TOP_RIGHT,
            allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
    }
}
