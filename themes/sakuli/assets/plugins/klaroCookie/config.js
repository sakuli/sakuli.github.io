// By default, Klaro will load the config from  a global "klaroConfig" variable.
// You can change this by specifying the "data-config" attribute on your
// script take, e.g. like this:
// <script src="klaro.js" data-config="myConfigVariableName" />
// You can also disable auto-loading of the consent notice by adding
// data-no-auto-load=true to the script tag.
var klaroConfig = {
    // You can customize the ID of the DIV element that Klaro will create
    // when starting up. If undefined, Klaro will use 'klaro'.
    elementID: 'cook',

    // How Klaro should store the user's preferences. It can be either 'cookie'
    // (the default) or 'localStorage'.
    storageMethod: 'cookie',

    // You can customize the name of the cookie that Klaro uses for storing
    // user consent decisions. If undefined, Klaro will use 'klaro'.
    cookieName: 'sakuli',

    // You can also set a custom expiration time for the Klaro cookie.
    // By default, it will expire after 120 days.
    cookieExpiresAfterDays: 365,

    // You can change to cookie domain for the consent manager itself.
    // Use this if you want to get consent once for multiple matching domains.
    // If undefined, Klaro will use the current domain.
    //cookieDomain: '.github.com',

    // Put a link to your privacy policy here (relative or absolute).
    privacyPolicy: '../dataprivacy',

    // Defines the default state for applications (true=enabled by default).
    default: true,

    // If "mustConsent" is set to true, Klaro will directly display the consent
    // manager modal and not allow the user to close it before having actively
    // consented or declines the use of third-party apps.
    mustConsent: false,

    // Show "accept all" to accept all apps instead of "ok" that only accepts
    // required and "default: true" apps
    acceptAll: true,

    // replace "decline" with cookie manager modal
    hideDeclineAll: true,

    // You can define the UI language directly here. If undefined, Klaro will
    // use the value given in the global "lang" variable. If that does
    // not exist, it will use the value given in the "lang" attribute of your
    // HTML tag. If that also doesn't exist, it will use 'en'.
    //lang: 'en',

    // You can overwrite existing translations and add translations for your
    // app descriptions and purposes. See `src/translations/` for a full
    // list of translations that can be overwritten:
    // https://github.com/KIProtect/klaro/tree/master/src/translations

    // Example config that shows how to overwrite translations:
    // https://github.com/KIProtect/klaro/blob/master/src/configs/i18n.js
    translations: {
        // If you erase the "consentModal" translations, Klaro will use the
        // bundled translations.
        de: {
            consentModal: {
                title: 'Cookies',
                description:
                    'Wir verwenden Cookies um Ihnen eine optimale Nutzung unserer Informationen zu ermöglichen: Essenzielle, ohne die die Nutzung der Website nicht sinnvoll möglich ist, sowie solche für Statistik- und Marketing-Zwecke. Über das Zahnrad-Symbol in der Navigation können Sie Ihre Einstellungen jederzeit ändern.',
            },
            sakuliio: {
                description: 'Dieses Cookie speichert Ihre Entscheidung zur Cookie Verwendiung auf dieser Seite und andere Basis Informationen für eine einwandfreie Funktionalität der Seite.',
            },
            mapsIframe: {
                description: 'Der Inhalt wird von einem Dritten bezogen und auf in einem iFrame eingebettet.',
            },
            googleanalytics: {
                description: 'Hier werden DSGVO-konform pseudonymisierte Informationen an externe Dienstleister übertragen, die es uns ermöglichen, uns noch stärker auf Ihre Bedürfnisse einzustellen.',
            },
            consentNotice: {
                learnMore: 'Einstellungen',
            },
            
            acceptAll: 'Allen zustimmen',
            acceptSelected: 'Auswahl zustimmen',
            purposes: {
                analytics: 'Analytics',
                security: 'Sicherheit',
                livechat: 'Live Chat',
                advertising: 'Anzeigen von Werbung',
                ux: 'Zusatzfunktionalität und UX',
                functionality: 'Basis Funktionen',
            },
        },
        en: {
            consentModal: {
                title: 'Cookies',
                description:
                    'We use cookies to facilitate the optimal use of the information on this web site: essential ones, needed to use the website in a meaningful way, as well as those for statistical and marketing purposes. You can change your settings at any time by clicking the gear symbol in the navigation.',
            },
            sakuliio: {
                description: 'This cookie is used to store your cookie consent decision and other values for basic site functionality.',
            },
            mapsIframe: {
                description: 'This content will be delivered by an external provider and embedded into an iFrame.',
            },
            googleanalytics: {
                description: 'These cookies are used to support the transfer of pseudonymised information to service providers in a GDPR compliant way. This enables us to react even more closely to your needs.',
            },
            consentNotice: {
                learnMore: 'Settings',
            },
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
                advertising: 'Advertising',
                ux: 'Additional functionality and User Experience',
                functionality: 'Basic functionality',
            },
        },
    },

    // This is a list of third-party apps that Klaro will manage for you.
    apps: [
        {
            name: 'sakuliio',
            default: true,
            title: 'Sakuli.io',
            purposes: ['functionality'],
            required: true,
            optOut: false,
            onlyOnce: false,

        },
        {
            name: 'mapsIframe',
            default: false,
            title: 'Google Maps iFrame',
            purposes: ['ux'],
            required: false,
            optOut: false,
            onlyOnce: false,
        },
        {
            // Each app should have a unique (and short) name.
            name: 'googleanalytics',

            // If "default" is set to true, the app will be enabled by default
            // Overwrites global "default" setting.
            // We recommend leaving this to "false" for apps that collect
            // personal information.
            default: false,

            // The title of you app as listed in the consent modal.
            title: 'Google Analytics',

            // The purpose(s) of this app. Will be listed on the consent notice.
            // Do not forget to add translations for all purposes you list here.
            purposes: ['analytics'],

            // A list of regex expressions or strings giving the names of
            // cookies set by this app. If the user withdraws consent for a
            // given app, Klaro will then automatically delete all matching
            // cookies.
            cookies: [
                // you can also explicitly provide a path and a domain for
                // a given cookie. This is necessary if you have apps that
                // set cookies for a path that is not "/" or a domain that
                // is not the current domain. If you do not set these values
                // properly, the cookie can't be deleted by Klaro
                // (there is no way to access the path or domain of a cookie in JS)
                [/^_g.*$/i, '/', 'sakuli.io'],
                [/^_g.*$/i, '/', 'hugodev'],
                [/^_g.*$/i, '/', 'sakuli-io.now.sh'],
                
            ],

            // An optional callback function that will be called each time
            // the consent state for the app changes (true=consented). Passes
            // the `app` config as the second parameter as well.
            callback: function (consent, app) {
                // This is an example callback function.
                console.log(
                    'User consent for app ' + app.name + ': consent=' + consent
                );
            },

            // If "required" is set to true, Klaro will not allow this app to
            // be disabled by the user.
            required: false,

            // If "optOut" is set to true, Klaro will load this app even before
            // the user gave explicit consent.
            // We recommend always leaving this "false".
            optOut: false,

            // If "onlyOnce" is set to true, the app will only be executed
            // once regardless how often the user toggles it on and off.
            onlyOnce: true,
        },

        // The apps will appear in the modal in the same order as defined here.

        
    ],
};