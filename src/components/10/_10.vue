<template>
<Page @navigatedTo="pageLoaded()">
<GridLayout class="myPage" rows="88,44,*,7">

<!---------------------------------------------------------------------------------------->

    <Paper ref="paper" row=1 rowSpan=2 />

<!---------------------------------------------------------------------------------------->

    <SearchPanel
        row=1
        rowSpan=2
        ref="searchPanel"
        @orderByParent_1="openItem"
        :randomButton="true"
    />

<!---------------------------------------------------------------------------------------->

</GridLayout>
</Page>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as TS                          from "@/../types/myTypes"
import * as TM                          from "@/themes/themeManager"
import store                            from "@/store/store"
import SearchPanel                      from "@/components/X/Search/Search_Panel.vue"
import Paper                              from "@/components/10/Paper.vue"

// -- =====================================================================================

@Component ( {
    components: { SearchPanel, Paper }
} )

// -- =====================================================================================

export default class Base_10 extends Vue {

// -- =====================================================================================

@Prop() id;

// -- =====================================================================================

mounted () {
    ( this.$refs.paper as Paper ).init( this.id );
    ( this.$refs.searchPanel as SearchPanel ).activeMode = "H";
    ( this.$refs.searchPanel as SearchPanel ).defaultActiveMode = "H";
}

// -- =====================================================================================

pageLoaded () {
    store.state.here = "Base_10";
    TM.themePatcher( this );
}

// -- =====================================================================================

openItem ( item: TS.ItemFound ) {
    ( this.$refs.paper as Paper ).init( item.id );
}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
    .myPage {
        width: 300;
    }

</style>