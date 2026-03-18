---
type: article
title: LineageOS 23.0
description: With new Google Design MD3E
date: 2026-03-18
---

# LineageOS <Badge type="tip" text="23.0" />

## Notes
1. **LOCK BOOTLOADER! (jd2019 tested only)** [More info](/guides/lock)
1. Maybe latest build with KernelSU
1. For kunlun2* need use recovery.img from Sourceforge

## Device updates

1. Added fsverity and incrementalfs from https://github.com/ximi-daisy-test/android_kernel_xiaomi_msm8953/commits/lineage-23.2-bpf/
1. Migrated to AIDL Fingerprint (jd2019)
1. Again Vulkan API enabled
1. Override kernel BPF version to 5.4.300
1. Added support for kunlun2 and kunlun2_row, thanks to @Error7666

## Download

The update is available in the OTA, manual download is available on the [firmware page](/roms/a16/lineage).

## Checksums


`03597dfd15a7041b993688aba22b0f31`  lineage-23.0-20260309-UNOFFICIAL-kunlun2_row.zip

`8f086e2014a935815db33f9497ef0811`  lineage-23.0-20260309-UNOFFICIAL-kunlun2.zip

`300defc2fed40fa7f92ee4cafc0f1c97`  lineage-23.0-20260316-UNOFFICIAL-jd2019.zip
