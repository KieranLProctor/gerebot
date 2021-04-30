
# Gerebot

Gerebot is a bot for Discord which was written by [`me`](https://github.com/KieranLProctor) using the [`Discord.js`](https://discord.js.org/#/) library. I created this project as something fun to do on the side and also to add to my Discord server to improve the experience.

## Disclaimer

This project is still very much a work in progress and may contain errors or even broken features, please bear this in mins if you wish to use this project in any way.


## Installation 

To install Gerebot use [`npm`](https://www.npmjs.com/) and follow the steps below.

```bash 
  git clone https://github.com/KieranLProctor/gerebot.git
  cd gerebot
  npm install
```

After running the commands above, copy the .env.example file into a .env file.

```bash 
  cp .env.example .env
```

Now you will need to fill in this file with your tokens like so.

```bash 
  DISCORD_TOKEN=[YOUR_DISCORD_TOKEN]
  MAPBOX_TOKEN=[YOUR_MAPBOX_TOKEN]
  DARKSKY_TOKEN=[YOUR_DARKSKY_TOKEN]
```

It's worth noting that this project is currently using [`opusscript`](https://www.npmjs.com/package/opusscript). However, if you are able to I'd highly recommend swapping it out for [`@discordjs/opus`](https://www.npmjs.com/package/@discordjs/opus).

## Configuration

If you would like to change any of the bots configuration, simply make the desired changes to the files in the `configs` directory.

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

  
## Authors

- [@kieran](https://www.github.com/KieranLProctor)

  