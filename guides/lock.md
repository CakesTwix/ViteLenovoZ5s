# How to lock bootloader on custom rom
::: danger
It's can be very danger for your device. Do backups first!
:::

1. [Flash avb pub key](https://nextcloud.cakestwix.com/s/XteDzEZrxm8mgf6) to avb_custom_key 
    * `fastboot erase avb_custom_key`
    * `fastboot flash avb_custom_key avb_custom_key.avbpub`
2. Flash LOS Recovery
3. Flash LineageOS
4. Reboot to bootloader
5. `fastboot flashing lock`
6. Done! You locked on ~~stock rom~~ Custom ROM

::: tip
If your device is "corrupted", then just [unlock device](/guides/unlock) and try again, check all hashsums
:::
