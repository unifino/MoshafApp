<template>
<GridLayout>

<!---------------------------------------------------------------------------------------->


<!---------------------------------------------------------------------------------------->


<!---------------------------------------------------------------------------------------->


<!---------------------------------------------------------------------------------------->

</GridLayout>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as NS                          from "@nativescript/core"
import * as TS                          from "@/../types/myTypes"
import * as TM                          from "@/themes/themeManager"
import * as storage                     from "@/mixins/storage"
import * as tools                       from "@/mixins/tools"
import store                            from "@/store/store"
import { route }                        from '@/mixins/router'
import { asma, Quran }                  from "@/../../db/Q/Quran"
import { Hadith }                       from "@/db/H/Al-Hadith"
import { Najawa }                       from "@/db/N/Al-Najawa"

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class template extends Vue {

// -- =====================================================================================

@Prop() Property = [];

// -- =====================================================================================

mounted () {

}

// -- =====================================================================================

destroyed () {

}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */


</style>