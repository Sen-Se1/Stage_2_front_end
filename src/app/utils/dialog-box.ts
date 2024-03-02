import {
    ConfirmBoxInitializer,
    DialogLayoutDisplay,
    DisappearanceAnimation,
    AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';
export class dialogBox {
    success(title: string, message: string) {
        const newConfirmBox = new ConfirmBoxInitializer();

        newConfirmBox.setTitle(title);
        newConfirmBox.setMessage(message);

        // Choose layout color type
        newConfirmBox.setConfig({
            layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            allowHtmlMessage: true,
            buttonPosition: 'center', // optional 
        });

        newConfirmBox.setButtonLabels('OUI', 'NON');

        // Simply open the popup and observe button click
        return newConfirmBox.openConfirmBox$()
    }


    info(title: string, message: string) {
        const newConfirmBox = new ConfirmBoxInitializer();

        newConfirmBox.setTitle(title);
        newConfirmBox.setMessage(message);

        // Choose layout color type
        newConfirmBox.setConfig({
            layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            allowHtmlMessage: true,
            buttonPosition: 'center', // optional 
        });

        newConfirmBox.setButtonLabels('OUI', 'NON');

        // Simply open the popup and observe button click
        return newConfirmBox.openConfirmBox$()
    }

    none(title: string, message: string) {
        const newConfirmBox = new ConfirmBoxInitializer();

        newConfirmBox.setTitle(title);
        newConfirmBox.setMessage(message);

        // Choose layout color type
        newConfirmBox.setConfig({
            layoutType: DialogLayoutDisplay.NONE, // SUCCESS | INFO | NONE | DANGER | WARNING
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            allowHtmlMessage: true,
            buttonPosition: 'center', // optional 
        });

        newConfirmBox.setButtonLabels('OUI', 'NON');

        // Simply open the popup and observe button click
        return newConfirmBox.openConfirmBox$()
    }

    danger(title: string, message: string) {
        const newConfirmBox = new ConfirmBoxInitializer();

        newConfirmBox.setTitle(title);
        newConfirmBox.setMessage(message);

        // Choose layout color type
        newConfirmBox.setConfig({
            layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            allowHtmlMessage: true,
            buttonPosition: 'center', // optional 
        });

        newConfirmBox.setButtonLabels('OUI', 'NON');

        // Simply open the popup and observe button click
        return newConfirmBox.openConfirmBox$()
    }

    warning(title: string, message: string) {
        const newConfirmBox = new ConfirmBoxInitializer();

        newConfirmBox.setTitle(title);
        newConfirmBox.setMessage(message);

        // Choose layout color type
        newConfirmBox.setConfig({
            layoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            allowHtmlMessage: true,
            buttonPosition: 'center', // optional 
        });

        newConfirmBox.setButtonLabels('OUI', 'NON');

        // Simply open the popup and observe button click
        return newConfirmBox.openConfirmBox$()
    }
}
