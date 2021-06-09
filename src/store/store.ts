import Vue                              from 'vue'
import Vuex                             from 'vuex'
import * as TS                          from "@/../types/myTypes"

// -- =====================================================================================

let state: state = {
                                                 
    appConfig       : {                      
        theme       : "Smoky"               ,
        darkMode    : false                 ,
    }                                       ,
                                             
    here            : null                  ,
                                             
    cacheBound      : []                    ,
                                             
    fav             : {                      
        Q           : []                    ,
        H           : []                    ,
    }                                       ,
    memo            : {                      
        Q           : []                    ,
        H           : []                    ,
    }                                       ,
                                             
    cakeBound       : {}                    ,
    routeStack      : []                    ,
                                             
}

Vue.use(Vuex);
export default new Vuex.Store( { state: state } ) ;

// -- =====================================================================================

interface state {
                                             
    appConfig       : appConfig             ,
                                             
    here            : TS.here               ,
                                             
    cacheBound      : TS.RawBound           ,
                                             
    fav             : {                      
        Q           : number[]              ,
        H           : number[]              ,
    }                                       ,
    memo            : {                      
        Q           : number[]              ,
        H           : number[]              ,
    }                                       ,
    cakeBound       : TS.CakeBound          ,
                                             
    routeStack      : string[]              ,
                                             
}

interface appConfig {
                                             
        theme       : TS.ThemeName          ,
        darkMode    : boolean               ,
                                             
}

// -- =====================================================================================
