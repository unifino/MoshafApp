<template>
<Page @navigatedTo="pageLoaded()">
<GridLayout rows="88,27*,44,10*,44">

<!---------------------------------------------------------------------------------------->

    <ScrollView 
        row=1
        verticalAlignment="middle"
        scrollBarIndicatorVisible="false"
    >
        <StackLayout>

            <Label
                :visibility="data_ar ? 'visible' : 'hidden'"
                v-for="(p,i) in data_ar.split('\n\n')"
                :key="i"
                :text="p"
                textWrap=true
                class="meaning"
            />

        </StackLayout>

    </ScrollView>

<!---------------------------------------------------------------------------------------->

    <GridLayout row=2 rows="*,3,*" >
        <GridLayout row=1 class="divider" />
    </GridLayout>

<!---------------------------------------------------------------------------------------->

    <ScrollView
        row=3
        verticalAlignment="middle"
        scrollBarIndicatorVisible="false"
    >

        <StackLayout>

            <Label
                :visibility="data_fa ? 'visible' : 'hidden'"
                v-for="(p,i) in data_fa.split('\n\n')"
                :key="i"
                :text="p"
                textWrap=true
                class="meaning"
            />

        </StackLayout>

    </ScrollView>

<!---------------------------------------------------------------------------------------->

</GridLayout>
</Page>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as TM                          from "@/themes/themeManager"
import * as NS                          from "@nativescript/core"
import * as TS                          from "@/../types/myTypes"
import store                            from "@/store/store"

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class Lookup extends Vue {

// -- =====================================================================================

@Prop() word: string;

// -- =====================================================================================

data_ar = "";
data_fa = "";
userAgent = "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36";
loadedFrom: TS.here;

// -- =====================================================================================

mounted () {
    this.translate_ar( this.word );
    this.translate_fa( this.word );
}

// -- =====================================================================================

pageLoaded () {
    store.state.here = "Lookup";
    TM.themePatcher( this );
}

// -- =====================================================================================

translate_ar ( word: string ) {

    const url = "https://www.almaany.com/ar/dict/ar-ar/";
    NS.Http.request( {
        url: url + word ,
        method: "GET",
        headers: { "User-Agent": this.userAgent }
    } )
    .then(
        res => this.data_ar = this.textExtractor_ar( res.content.toString() ),
        e => {}
    )
    .catch( e => {} );

}

// -- =====================================================================================

translate_fa ( word: string ) {

    const url = "https://www.almaany.com/ar/dict/ar-fa/";
    NS.Http.request( {
        url: url + word ,
        method: "GET",
        headers: { "User-Agent": this.userAgent }
    } )
    .then(
        res => this.data_fa = this.textExtractor_fa( res.content.toString() ),
        e => {}
    )
    .catch( e => {} );

}

// -- =====================================================================================

textExtractor_ar ( text: string ) {

    // .. pick first part
    // .. beginning
    let cut_A = '<ol class="meaning-results">';
    let cut_A_idx = text.indexOf( cut_A );
    // .. cut it
    text = text.substring( cut_A_idx );
    // .. end
    let cut_B = '</ol>';
    let cut_B_idx = text.lastIndexOf( cut_B );
    // .. cut it
    text = text.substring( 0, cut_B_idx );
    // .. remove ads
    text = this.ads_remover( text );
    // .. trim
    text = this.trimmer( text );

    return text;

}

// -- =====================================================================================

textExtractor_fa ( text: string ) {

    let text_tmp = text;
    let result = "";

    // .. define points
    let cut_A = '<tbody>';
    let cut_B = '</tbody>';

    while ( text.includes( cut_A ) ) {

        let cut_A_idx = text.indexOf( cut_A );
        // .. cut actual text
        text = text.substring( cut_A_idx );
        // .. end
        let cut_B_idx = text.indexOf( cut_B );
        // .. cut copy
        text_tmp = text.substring( 0, cut_B_idx );
        // .. remove ads
        text_tmp = this.ads_remover( text_tmp );
        // .. concat result
        result += this.trimmer( text_tmp );
        // .. purge already proceed part
        text = text.substr( cut_B_idx + cut_B.length );

    }

    return this.trimmer( result );

}

// -- =====================================================================================

trimmer ( text: string ) {
    text = text.replace( /<style([\s\S]*?)<\/style>/gi, '' );
    text = text.replace( /<script([\s\S]*?)<\/script>/gi, '' );
    text = text.replace( /<\/div>/ig, '\n' );
    text = text.replace( /<\/li>/ig, '\n' );
    text = text.replace( /<li>/ig, '' );
    text = text.replace( /<\/ul>/ig, '\n' );
    text = text.replace( /<\/p>/ig, '\n' );
    text = text.replace( /<br\s*[\/]?>/gi, '\n' );
    text = text.replace( /\t/ig, '' );
    text = text.replace( /<[^>]+>/ig, '' );
    text = text.replace( /\n\n \n\n/ig, '\n\n' );
    text = text.replace( /\n\n+/ig, '\n\n' );
    text = text.replace( /&nbsp;/ig, ' ' );
    text = text.trim();
    return text;
}

// -- =====================================================================================

ads_remover ( text: string ) {

    const rgx = /<div.*>(.|\n)*?<\/div>/g;
    return text.replace( rgx, "" );

}

// -- =====================================================================================

destroyed () {}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
    .divider {
        background-color: #2a4c4e;
    }

/* ------------------------------------------- */
    .meaning {
        font-family: Homa;
        width: 88%;
        padding: 14;
        margin-bottom: 14; 
        font-size: 14.4;
        border-radius: 7;
        border-width: 1;
    }

    .CoolGreen .meaning {
        color: #d3d3d3;
        border-color: #888675;
    }

    .Smoky .meaning {
        color: #696868;
        border-color: #909192;
    }

    .Black .meaning {
        color: #696868;
        border-color: #909192;
    }

</style>