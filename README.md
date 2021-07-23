# Token Sniffer

Sniff out new contracts based on their name.

## How To

1. Clone the repo
2. Enter the folder
3. run `yarn install`
4. run `yarn start --term "Token Name"` (where "Token Name" is replaced by the name of the token you wish to sniff out.)

## Notes

DYOR. This is not an exact science. This tool searches for tokens but it doesn't mean it will select the right one (it generally returns many).

## Tips

You can run the app in multiple Terminal tabs with different search terms. i.e.

1. run `yarn start --term "ShibaGold"` in Tab 1
2. run `yarn start --term "Shiba Gold"` in Tab 2
3. run `yarn start --term "$hibaGold"` in Tab 3
4. run `yarn start --term "$Shiba Gold"` in Tab 4
5. run `yarn start --term "$Gold"` in Tab 5

etc.
