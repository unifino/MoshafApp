<template>
<GridLayout>

<!---------------------------------------------------------------------------------------->

    <TextField
        ref="textField"
        :hint="hint + appendHint"
        class="textField"
        @textChange="$emit('interact_3', $event.value);textChanged($event.value, false);"
        @returnPress="returnPressed( $event.object.text )"
    />

<!---------------------------------------------------------------------------------------->

</GridLayout>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as TS                          from "@/../types/myTypes"
import * as storage                     from "@/mixins/storage"
import * as tools                       from "@/mixins/tools"
import store                            from "@/store/store"
import SearchPanel                      from "@/components/X/Search/Search_Panel.vue";
import IntuitivePanel                   from "@/components/X/Intuitive/Intuitive_Panel.vue"
import { isNumber }                     from "@nativescript/core/utils/types"
import { Hadith }                       from "@/db/H/Al-Hadith"

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class Input extends Vue {

// -- =====================================================================================

@Prop() hashTagButton: TS.Source;
@Prop() exchangeButton: TS.Source;

// -- =====================================================================================

hint: string = "بحث";
SearchPanel: SearchPanel = this.$parent as SearchPanel; 

// -- =====================================================================================

get appendHint () {
    if ( this.SearchPanel.activeMode === "Q" ) return " في القرآن";
    if ( this.SearchPanel.activeMode === "H" ) return " في الحادیث";
    if ( this.SearchPanel.activeMode === "T" ) return " في العناوين";
    if ( this.SearchPanel.activeMode === "N" ) return " في النجاوى";
}

// -- =====================================================================================

mounted () {

    let pad = 140;
    if ( this.exchangeButton ) pad += 23;
    if ( this.hashTagButton  ) pad += 30;
    if ( this.exchangeButton && this.hashTagButton ) pad += 7;
    try { ( this.$refs.textField as any ).nativeView.paddingLeft = pad } catch {}

}

// -- =====================================================================================

textChanged_TO;
textChanged ( phrase: string, force?: boolean ) {

    if ( this.textChanged_TO ) clearTimeout( this.textChanged_TO );

    this.textChanged_TO = setTimeout( () => {
        // .. jump mode
        let No1 = Number( tools.latinDigits( phrase ) );
        if ( isNumber( No1 ) && !Number.isNaN(No1) ) {
            if ( !Hadith[ No1 ] ) {
                tools.toaster( "لم يتم العثور على شيء !" );
            }
            else {
                let data = [ tools.getItem("H",No1) ];
                try { data.unshift( tools.getItem("Q",No1) ) } catch {}
                this.SearchPanel.display_ON( data, "List_1", "phrase" );
            }
        }
        // .. deep mode
        else {
            if ( phrase.length > 3 ) {
                let str = tools.inFarsiLetters( phrase );
                let data = tools.getPhrase( this.SearchPanel.activeMode, str );
                if ( data ) this.SearchPanel.display_ON( data, "List_1", "phrase" );
            }
        }
    }, force ? 0 : 500 );

}

// -- =====================================================================================

returnPressed ( phrase: string ) {

    // .. Just in Tag-Mode
    if ( this.SearchPanel.activeMode === "T" ) {

        if ( phrase.trim() ) {

            let text = tools.inFarsiLetters( phrase.trim() ),
                IntuitivePanel = this.$parent.$parent as IntuitivePanel,
                // .. build parcels
                parcel_O: TS.earthParcel = [ IntuitivePanel.source, IntuitivePanel.id ],
                parcel_X: TS.earthParcel = [ "T", null, text ],
                items: TS.ItemFound[];

            // .. toggle Tag
            let result = tools.toggleBound( parcel_O, parcel_X );
            store.state.cakeBound = result.data;
            items = tools.getTagItems( IntuitivePanel.source, IntuitivePanel.id );

            // .. display new items
            this.SearchPanel.display_ON( items, "Flex_T", "tag" );
            this.SearchPanel.activeMode = "T";

            // .. hard registration
            storage.earthActionREC( result.action, [ parcel_O, parcel_X ] );

        }

    }

    // .. Other Modes
    else {
        if ( phrase ) this.textChanged( phrase, true );
        else this.SearchPanel.display_RESET();
    }

}

// -- =====================================================================================

dismiss () {
    try { ( this.$refs.search as any ).nativeView.text = null } catch {}
    try { ( this.$refs.search as any ).nativeView.dismissSoftInput() } catch {}
}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
    .textField {
        padding-left: 140;
        width: 100%;
    }

    .CoolGreen .textField {
        color: #a8a8a8;
        placeholder-color: #8f875d;
    }

    .Smoky .textField {
        color: #a8a8a8;
        placeholder-color: #8f875d;
    }

    .Black .textField {
        color: #3f3f3f;
        placeholder-color: #414040;
    }

</style>