/* global M */

import {logger} from "@randy.tarampi/browser-logger";

export const onReady = () => {
    logger.debug(`Service worker from ${__SW_BUNDLE_PATH__} is ready`);
};

export const onRegistered = () => {
    logger.debug(`Service worker from ${__SW_BUNDLE_PATH__} has been registered`);
};

export const onCached = () => {
    logger.debug(`Service worker from ${__SW_BUNDLE_PATH__} has cached assets`);
};

export const onUpdateFound = () => {
    logger.debug(`Service worker from ${__SW_BUNDLE_PATH__} needs updating`);
};

export const onUpdated = () => {
    logger.debug(`Service worker from ${__SW_BUNDLE_PATH__} has been updated`);

    window.reloadWithNewServiceWorker = () => {
        location.reload(true);
    };

    M.toast({
        html: `
        <p>
            <span class="hide-on-small-and-down">
                I just pushed
                <a
                    target="__blank"
                    rel="noopener noreferrer"
                    href="https://github.com/randytarampi/me/releases/latest"
                    data-metrics-event-name="anchor"
                    data-metrics-type="href"
                    data-metrics-name="an update"
                    data-metrics-label="an update"
                >
                    an update
                </a> and you're behind.
            </span>
            <a
                href="javascript:void(0)"
                data-metrics-event-name="anchor"
                data-metrics-type="onClick"
                data-metrics-name="Reload now"
                data-metrics-label="Reload now"
                onclick="reloadWithNewServiceWorker();"
            >
                Reload now
            </a> to stay current!
        </p>
        <button
            class="hide-on-small-and-down btn-flat toast-action"
            onclick="reloadWithNewServiceWorker();"
            data-metrics-event-name="button"
            data-metrics-type="onClick"
            data-metrics-name="Reload and update"
            data-metrics-label="Reload and update"
        >
            Reload and update
        </button>`,
        classes: "toast__sw-updated"
    });
};

export const onOffline = () => {
    logger.debug(`Service worker from ${__SW_BUNDLE_PATH__} reports that we're offline`);
};

export const onError = error => {
    logger.error(error, `Could not install service worker from ${__SW_BUNDLE_PATH__}`);
};
