"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    const thumbnailLinks = document.querySelectorAll('#thumbnails a');
    // Select a random entry out of these 6.
    const randomEntry = thumbnailLinks[getRandomInt(0,5)];
    // Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    switchFullImage(randomEntry.getAttribute('href'), randomEntry.querySelector('img').getAttribute('alt'));
    // Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    randomEntry.parentElement.classList.add('bg-dark', 'text-white');
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // Select all the 6 links (<a>) in the thumbnail section.
    const allLinks = document.querySelectorAll('#thumbnails a');
    // Set an event listener for the click event on every <a> element.
    allLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default action for the link (we don't want to follow it).
            event.preventDefault();

            // Remove the .bg-dark and .text-white classes from the card where it's currently set.
            const currentCard = document.querySelector('.card.bg-dark.text-white');
            if (currentCard) {
                currentCard.classList.remove('bg-dark', 'text-white');
            }

            // Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
            event.currentTarget.parentElement.classList.add('bg-dark', 'text-white');

            // Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
            const imageUrl = event.currentTarget.getAttribute('href');
            const altText = event.currentTarget.querySelector('img').getAttribute('alt');
            switchFullImage(imageUrl, altText);

            // Load notes for the current image.
            loadNotes(imageUrl);
        });
    });
}


/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    // Select the notes field and add a blur listener.
    document.getElementById('notes').addEventListener('blur', function (event) {
        // When the notes field loses focus, store the notes for the current image in the local storage.
        const notes = document.getElementById('notes').textContent;
        const imageUrl = document.querySelector('#fullImage img').getAttribute('src');
        if (notes === '') {
            localStorage.removeItem(imageUrl);
        } else {
            localStorage.setItem(imageUrl, notes);
        }
    });
}
/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    // Get the <img> element for the full image. Select it by its class or tag name.
    const fullImage = document.querySelector('#fullImage img');
    // Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    fullImage.setAttribute('src', imageUrl);
    // Select the <figcaption> element.
    const figCaption = document.querySelector('#fullImage figcaption');
    // Set the description (the one you used for the alt attribute) as its text content.
    figCaption.textContent = imageDescription;
    console.log(imageDescription)
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // Select the notes field.
    const notesField = document.getElementById('notes');
    // Check the local storage at the provided key.
    const notes = localStorage.getItem(key);
    // If there's an entry, set the notes field's HTML content to the local storage's content.
    // If there's no entry, set the default text "Enter your notes here!".
    if (notes !== null) {
        notesField.textContent = notes;
    } else {
        notesField.textContent = 'Enter your notes here!';
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
