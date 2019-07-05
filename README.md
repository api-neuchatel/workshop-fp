# Workshop Functional Programming

Merci pour votre intérêt et votre participation à ce workshop.
Afin que nous soyons le plus efficace durant les 3 heures qui durera cette soirée, nous vous demandons d'installer les outils nécessaires afin d'être le plus efficace le jour J.

Vous trouverez ci-dessous les outils à installer pour les différents systèmes d'exploitation, nous comptons sur vous !

## Installation

### Windows

1. Installer Git : https://git-scm.com/download/win
2. Installer Node/NPM : https://nodejs.org/en/download/
3. Installer Visual Studio Code : https://code.visualstudio.com/  
Puis, au sein de Visual Studio Code (Terminal -> New Terminal), lancez les commandes ci-dessous :
4. Cloner le repository à l'emplacement de votre choix
```bash
git clone https://github.com/association-api/workshop-fp
```
5. Tester l'installation
```bash
cd workshop-fp/code/exercise0 && npm install && npm test
```

### MacOS

1. Installez Xcode depuis le Mac App Store (comptez environ 1h). Une fois fait, ouvrez Xcode et laissez-le télécharger les composants additionels. Xcode contient tous les outils nécessaires à la compilation de vos programmes pour votre Mac ainsi que le logiciel de versioning Git.

2. Installez Homebrew en utilisant la commande suivante dans un Terminal:

    ```bash
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
    
    Homebrew est un package manager pour Mac, similaire à APT pour les distributions Linux Debian.

3. Installez Node et NPM : `brew install node`

4. Vérifiez votre installation : `node -v` et `npm -v` doivent afficher les versions respectives de Node et NPM que vous venez d'installer.

5. Installez Visual Studio Code: https://code.visualstudio.com/Download

6. Clonez ce repository à l'emplacement de votre choix

    ```bash
    git clone https://github.com/association-api/workshop-fp
    ```
    
7. Testez votre installation

    ```bash
    cd workshop-fp/code/exercise0 && npm install && npm test
    ```
    
    Si tout va bien, vous devriez voir un message à l'écran vous indiquant que vous avez passé le test `2 + 2 = 4`.

### Linux

1. Installer Visual Studio Code : https://code.visualstudio.com/  
Puis, au sein de Visual Studio Code (Terminal -> New Terminal), lancez les commandes ci-dessous :

2. Installer Node, NPM et Git
```bash
apt-get install git nodejs npm (Debian)
yum install git nodejs npm (RPM)
```

3. Cloner le repository à l'emplacement de votre choix
```bash
git clone https://github.com/association-api/workshop-fp
```

4. Tester l'installation
```bash
cd workshop-fp/code/exercise0 && npm install && npm test
```
