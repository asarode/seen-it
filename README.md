# seen-it
![Hero](http://i.imgur.com/DHQW5JQ.png)
A chrome extension for Imgur that skips images you've already seen. Perfect for hardcore Imgurians. You can [download it on the chrome store](https://chrome.google.com/webstore/detail/seen-it/nmajkegnjcjcjehiindhfldkfeoifeff).

## What does it do?
![Demo](https://j.gifs.com/yXorJo.gif)

Seen It stores the images you see on Imgur and then automatically skips those images if you see them again. There are also options that allow you to disable skipping images, disable storing images, and clear all your stored images.

## Things I want to add
The issues section includes other features, but a few things to work on are:
- [x] Keyboard shortcut to toggle options
- [ ] Keyboard shortcut that disabled skip on key down and then enables skipping again on key up
- [ ] Switch from localstorage to chrome sync
- [ ] Think about how to automatically clear old images if the history gets too large
- [ ] Add tests

## Contributing
Fork from master to a new branch. Make your changes. Send a pull request. Please add doc blocks to functions and comments in other places where it makes sense. The code is all ES6 so contributing to this project is a good way to learn it if you don't know it already! :D

## Development
You'll need to have npm working. Run `npm install` to get the dependencies. You can run `npm run build` to have gulp transpile and bundle all the src code into a dist folder. You can use `npm run demo` to copy the files into a demo folder that you can upload to test the extension locally. `npm run dev` can be used to watch the src files and rebuild every time they change.

Sometimes Chrome doesn't update the uploaded extension very well. You can try changing the version number in the manifest.json, running `npm run demo`, then uploading the extension again.

## Contact
This is my first chrome extension so let me know if there are ways I can improve the code! You can open an issue, send me a tweet ([@rjun07a](https://twitter.com/rjun07a)), or shoot me an email if you want to get in touch. I'll try to get back to you quickly.
