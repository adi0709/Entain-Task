class BookOfDeadGamePage {
    constructor() {
        this.gameFrame = "[id='ax-game-iframe']"
        this.gameFrameBody = "0.contentDocument.body"
        this.gameFramProgressBar = "#pngProgressBar"
        this.gameFramProgressBarRawValue = "data-rawvalue"
    }

    // Method to verify the game is loading
    verifyGameLoading() {

        //Validating the correct Url is reached
        cy.url().should("include", "slots/book-of-dead");

        //Checking for the iFrame to be visible and have specific values
        cy.get(this.gameFrame).should("be.visible")

        //Validating if the progress bar exists and its value changes
        cy.get(this.gameFrame)
            .its(this.gameFrameBody)
            .should("not.be.empty")
            .then(cy.wrap)
            .find(this.gameFramProgressBar)
            .invoke("attr", this.gameFramProgressBarRawValue)
            .should("exist")
            //getting the initial value of the loading bar value
            .then((initialValue) => {

                cy.get(this.gameFrame)
                    .its(this.gameFrameBody)
                    .then(cy.wrap)
                    .find(this.gameFramProgressBar)
                    .should("have.attr", this.gameFramProgressBarRawValue)
                    //asserting the loading bar value changes
                    .and('satisfy', (num) => num > initialValue)
            });
    }
}

export default BookOfDeadGamePage;