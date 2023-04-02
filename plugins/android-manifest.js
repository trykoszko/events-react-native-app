const {withAndroidManifest} = require("@expo/config-plugins")

module.exports = function androidManifestPlugin(config) {
    return withAndroidManifest(config, async config => {
        let androidManifest = config.modResults.manifest

        // add the tools to apply permission remove
        androidManifest.$ = {
            ...androidManifest.$,
            "xmlns:tools": "http://schemas.android.com/tools",
        }

        // add remove property to the audio record permission
        androidManifest["uses-permission"] = androidManifest["uses-permission"].map(
            perm => {
                if (perm.$["android:name"] === "android.permission.RECORD_AUDIO") {
                    perm.$["tools:node"] = "remove"
                }
                return perm
            }
        )

        androidManifest["meta-data"] = [
            {
                $: {
                    "android:name": "com.facebook.sdk.ApplicationId",
                    "android:value": "@string/facebook_app_id"
                },
            },
        ]

        return config
    })
}
