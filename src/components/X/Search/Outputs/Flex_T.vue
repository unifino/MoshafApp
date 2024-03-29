<template>
<GridLayout :visibility="visibility" class="outputBox transparent">

<!---------------------------------------------------------------------------------------->

    <ScrollView verticalAlignment="middle" marginTop="20">

        <FlexboxLayout
            flexWrap="wrap"
            flexDirection="row-reverse"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Label
                v-for="(item,i) in data"
                :key="i"
                :class="itemClasser(item)"
                :text="item.text.slice(2)"
                textWrap=true
                @tap="tagToggler(item)"
            />

        </FlexboxLayout>

    </ScrollView>

<!---------------------------------------------------------------------------------------->

</GridLayout>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as TS                          from "@/../types/myTypes"
import * as tools                       from "@/mixins/tools"
import * as storage                     from "@/mixins/storage"
import store                            from "@/store/store"
import SearchPanel                      from "@/components/X/Search/Search_Panel.vue";

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class Flex_T extends Vue {

// -- =====================================================================================

@Prop() vividBG: boolean;

// -- =====================================================================================

data = [];
visibility = "collapsed";
SearchPanel: SearchPanel = this.$parent as any; 

// -- =====================================================================================

init ( data: TS.ItemFound[] = [] ) {
    this.data = data;
    this.visibility = this.data.length ? "visible" : "collapsed";
}

// -- =====================================================================================

itemClasser ( item: TS.ItemFound ) {
    let tagClass = 'tag';
    if ( item.flags.isBounded ) tagClass += ' bounded';
    if ( item.flags.isCached ) tagClass += ' cached';
    return tagClass;
}

// -- =====================================================================================

tagToggler ( item: TS.ItemFound ) {

    let IntuitivePanel = this.SearchPanel.IntuitivePanel,
        parcel_O: TS.earthParcel = [ IntuitivePanel.source, IntuitivePanel.id ],
        parcel_X: TS.earthParcel = [ "T", null, item.text.slice(2) ],
        code_O = parcel_O.join( "_" ),
        code_X = parcel_X.filter( x => x !== null ).join( "_" );

    let result = tools.toggleBound( parcel_O, parcel_X );

    store.state.cakeBound = result.data;
    try { item.flags.isBounded = store.state.cakeBound[ code_X ].includes( code_O ) }
    catch { item.flags.isBounded = false }

    // .. hard registration
    storage.earthActionREC( result.action, [ parcel_O, parcel_X ] );

}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
    .tag {
        font-family: Amiri-Regular;
        font-size: 18;
        padding: -5 12 5 12;
        margin: 3;
        border-radius: 4;
    }
    .CoolGreen .tag {
        background-color: #343534;
        color: #e0e0e0;
    }
    .Smoky .tag {
        background-color: #343534;
        color: #e0e0e0;
    }
    .Black .tag {
        background-color: #343534;
        color: #e0e0e0;
    }

    .CoolGreen .bounded,
    .Smoky .bounded,
    .Black .bounded {
        background-color: #0e962b;
        color: white;
    }

    .transparent { background-color: #332c2c2c }

</style>