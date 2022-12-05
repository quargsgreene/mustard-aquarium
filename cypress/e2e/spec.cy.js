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

  it('finds invisible elements', () => {
    cy.get('.invisible')
      .click({ multiple: true, timeout: 10000, force: true });
  });

  it('displays the message', () => {
    cy.get('.sentence', { timeout: 10000 });
  });
});
