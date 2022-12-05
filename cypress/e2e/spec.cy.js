describe('Mustard Aquarium Tests', () => {
  it('visits the Mustard Aquarium page', () => {
    cy.visit('https://quargsgreene.github.io/mustard-aquarium/');
  });

  it('starts the audio of the song', () => {
    cy.get('#audio', { timeout: 10000 })
      .invoke('attr', 'src')
      .then((audioFile) => {
        const audio = new Audio(audioFile);
        audio.play();
      });
  });
});
