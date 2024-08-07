# CLI Compressor

CLI Compressor est une application en ligne de commande (CLI) pour compresser les images. Il prend en charge plusieurs formats d'image comme JPEG, PNG, et GIF, et permet d'ajuster dynamiquement la qualité de compression pour respecter une taille maximale de fichier spécifiée.

## Fonctionnalités

- Compression des images JPEG, PNG et GIF.
- Support de la spécification de la qualité de l'image.
- Compression d'un dossier entier d'images.
- Ajustement dynamique de la qualité pour respecter une taille maximale de fichier.
- Option de redimensionnement des images avant compression.
- Journalisation des actions et des erreurs pour faciliter le diagnostic.

## Prérequis

Node.js (v14 ou supérieur)

## Installation

1. Clonez le dépôt :

```sh
git clone https://github.com/votre-utilisateur/cli-compressor.git
cd cli-compressor
```

2. Installez les dépendances :

```sh
npm install
```

## Utilisation

### Commandes

**Compression d'images**

Compresser une image ou un dossier d'images.

**Options :**

- -i, --input <input> : Dossier source des images (obligatoire).
- -o, --output <output> : Dossier de destination des images compressées.
- -q, --quality <quality> : Qualité de l'image compressée (1-100).
- -r, --resolution <resolution> : Résolution de sortie pour les images (ex : 800x600).
- -s, --size <size> : Taille maximale des fichiers de sortie en Ko (ex : 500).

**Exemple d'utilisation**

1. Compression d'un dossier sans redimensionnement :

```sh
./bin/index.js compress --input ./source-images --output ./compressed-images --quality 80 --size 500
```

2. Compression d'un dossier avec redimensionnement :

```sh
./bin/index.js compress --input ./source-images --output ./compressed-images --quality 80 --resolution 800x600 --size 500
```

## Structure du Projet

```plaintext
cli-compressor/
├─ bin/
│  └─ index.js           # Point d'entrée de l'application CLI
├─ src/
│  ├─ commands/
│  │  └─ compress.js     # Logique de compression des images
│  ├─ utils/
│  │  └─ logger.js       # Fonctions utilitaires de journalisation
│  └─ lib/
├─ package.json          # Dépendances et scripts de projet
└─ README.md             # Documentation du projet
```

## Développement

### Démarrage

Pour démarrer le développement, clonez le dépôt et installez les dépendances comme décrit dans la section Installation.

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request avec des explications détaillées sur les modifications apportées.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
