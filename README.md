# Gmail Unsubscribe

![](src/icons/icon-128.png)

Unsubscribes from a mailing list by pressing `Command + U` (Mac) or `Alt + U` (Windows/Linux) on a open email in Gmail.

It's possible to re-bind the shorcut by visiting [chrome://extensions/shortcuts](chrome://extensions/shortcuts).

## Installation

- [Download in Chrome Web Store](https://chrome.google.com/webstore/detail/gmail-unsubscribe/gkakfbcilfllnomafmgaekkhcmogalah)

## Development

1. Clone this repository

   ```sh
   git clone git@github.com:gordalina/gmail-unsubscribe.git
   ```

1. Run `yarn` to install dependencies.
1. Run `yarn start`
1. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   1. Check `Developer mode`
   1. Click on `Load unpacked extension`
   1. Select the `build` folder.
1. Happy hacking.

## Packaging extension

1. Run `yarn package`
2. Run `yarn version <--major|--minor|--patch>`

## Credits

Thanks to @maaaayoo for the logo
