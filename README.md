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

1. You can run the app in multiple Terminal tabs with different search terms. i.e.

Tab 1: run `yarn start --term "ShibaGold"
Tab 2: run `yarn start --term "Shiba Gold"
Tab 3: run `yarn start --term "$hibaGold"
Tab 4: run `yarn start --term "$Shiba Gold"
Tab 5: run `yarn start --term "$Gold"

etc.
