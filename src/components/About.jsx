function About() {
  return (
    <>
      <h1>Mode d'emploi de CodeMe</h1>
      <h2>Introduction</h2>
      <p>
        CodeMe est un site web qui vous permet de stocker, afficher et gérer des fragments de code en utilisant votre navigateur. Voici comment utiliser les différentes fonctionnalités de CodeMe.
      </p>
      <h2>Utilisation de la page principale</h2>
      <ol>
        <li>
          <strong>Saisie du Code</strong>
          <ul>
            <li>
              <strong>Titre</strong> : Dans le premier champ, intitulé titre, entrez le nom de votre fragment de code. Ce titre vous permettra de l'identifier plus facilement.
            </li>
            <li>
              <strong>Code</strong> : Dans le champ code, saisissez le fragment de code que vous souhaitez enregistrer.
            </li>
            <li>
              <strong>Langage de programmation</strong> : Utilisez le sélecteur pour choisir le langage de programmation de votre code. Cette sélection permettra de mettre en évidence la syntaxe du code.
            </li>
          </ul>
        </li>
        <li>
          <strong>Ajout du Code</strong>
          <ul>
            <li>
              Cliquez sur le bouton ajouter pour enregistrer votre fragment de code. Celui-ci sera stocké dans la mémoire locale de votre navigateur.
            </li>
            <li>
              Une fois ajouté, un nouveau bloc apparaîtra en bas de la page, contenant trois boutons : le titre du code, une icône d'édition et une icône de corbeille.
            </li>
          </ul>
        </li>
      </ol>
      <h2>Gestion des Codes Enregistrés</h2>
      <ol>
        <li>
          Afficher le Code
          <ul>
            <li>Cliquez sur le bouton du <strong>titre</strong> de votre code pour afficher le fragment de code que vous avez précédemment entré.</li>
            <li>Si vous souhaitez ajouter une copie du même fragment de code, cliquez à nouveau sur <strong>ajouter</strong>.</li>
          </ul>
        </li>
        <li>
          Éditer le Code
          <ul>
            <li>Cliquez sur <strong>l'icône d'édition</strong> (représentée par un crayon). Vous pourrez alors modifier le contenu du code, mais le titre restera inchangé.</li>
            <li>
              Une fois vos modifications effectuées, n'oubliez pas de cliquer sur <strong>ajouter</strong> pour enregistrer les changements.
            </li>
          </ul>
        </li>
        <li>
          Supprimer le Code
          <ul>
            <li>Pour supprimer un fragment de code, cliquez sur l'icône de <strong>corbeille</strong>. Cela supprimera définitivement le code de la mémoire locale.</li>
          </ul>
        </li>
      </ol>
      <h2>Affichage et Copie du Code</h2>
      <ul>
        <li>Lorsque vous affichez un fragment de code, celui-ci sera présenté avec une mise en évidence syntaxique appropriée au langage choisi.</li>
        <li>Une <strong>bouton de copie</strong> est disponible dans le bloc d'affichage du code. Cliquez dessus pour copier le code dans le presse-papiers, ce qui vous permettra de le coller ailleurs facilement.</li>
      </ul>
      <h2>
        Conclusion
      </h2>
      <p>CodeMe est un outil pratique pour gérer vos fragments de code directement depuis votre navigateur. Utilisez les champs de saisie et les boutons pour enregistrer, afficher, éditer et supprimer vos codes en toute simplicité. La mise en évidence syntaxique et la fonction de copie rendent la gestion des codes encore plus efficace.</p>
    </>
  )
}

export default About;