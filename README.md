# SnapMobile-OneSignal

# Usage

Include this private module by adding the following under `dependencies` in `package.json`, and run `npm install`.

    "snapmobile-onesignal": "git+ssh://@github.com/SnapMobileIO/SnapMobile-OneSignal.git",

To configure, add the following to `routes.js`:

    import OneSignal from 'snapmobile-onesignal';

# Updating

Make any changes in `/src`.

Once changes are completed, run `gulp dist` to process JavaScript files and add to `/dist`.
