## Misc parts of devstream

I'm putting some bits of code here so you can see how some of the things work on the back side.

#### Tags

> Check out the code for this is in `tagbuilder.js`

Tag definitions come from the `video-tags.js` located in the parent directory of this repo.
Based on the tag definitions a dictionary of keywords that need to be matched is built.
When a YouTube video is processed Devstream tries to auto-tag it by fetching the video caption (if available), extracting the keywords and comparing them to the ones in the tag match dictionary.
It outputs an object that contains a property for each tag name (referred as `title` in the code) which has as its value the number of match occurences associated with that title.

I'm still thinking about if this is the right way to do it. Maybe including the video title and description and assigning different weights to the different sources would be better.
If you have any input on this I'd love to hear it.

If you want to try it out check the `tagbuilder.js` file. It exports a function that takes a string as input and outputs the mapped tags with scores.
