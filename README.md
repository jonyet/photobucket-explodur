# photobucket-explodur

utility to help you liberate your photobucket content (wItH PuRE nOdE) after the recent Photobucket UX update that makes it _yet more difficult_ to escape the platform you naively uploaded all your photos to when you were between 15-25 years old

### DISCLAIMER: if you choose to clone/fork this repo to your public github, be aware that you can potentially expose all your photo source links. _Photobucket does not require authentication to fetch from the raw source urls even if they are marked as private_, so just get your shit and close the account (just make sure you got everything).

**Prerequisites**

node 12+ recommended

**Get started**

install the latest stable version of node (suggest via nvm [https://github.com/creationix/nvm/blob/master/README.markdown])

- clone this project

- install your dependencies

```
npm install
```

you can test this immediately by running `node index.js` - it'll download a couple of test files that i have dropped into `Links.json`.

**Phase 1: The Manual Bits**

- login to your photobucket account using Chrome.
- the fun part: you're gonna need to scroll down for a while. go until nothing else loads. this will continue to load 40 items each load-event until there is nothing left to show, which exposes the precious image sources you need for this tool to work

**Phas3 B: Engage hacks**

- open Chrome DevTools Console(right-click on the page => Inspect Element => go to the Console tab)
- paste this into the console and hit `Enter`:

```
$x("//img[contains(@src,'hosting.photobucket.com')]")
```

- right click result => Store as global variable (this should return `temp1` to the console)
- now paste this one into the console and hit `Enter`:

```
var sources = temp1.map(function (item) {
  return item['src'];
});
```

_the above snippet just maps all the image sources you need to the new variable `sources`_

- last, you need to copy that array to your clipboard - type this inot the console and hit enter:

```
copy(sources)
```

now you have the `sources` array you created sitting on your clipboard, ready to paste into a text editor

**Profit Phase: Run this tool**

- open `Links.json` and paste the `sources` data from your clipboard into the `data` array and save the changes. _REMINDER: please don't commit this to your own public repo. Review the disclaimer at the top._
- in your terminal, run the tool:

```
node index.js
```

ok it should have worked and you should have your photos, properly named, in the photos folder. along with my two sample contributions. unless you deleted them.

ok seeya hopefully this will work for a while since i happened to have a need to write this like the day they released their new UI.
