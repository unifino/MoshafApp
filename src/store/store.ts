import Vue                              from 'vue'
import Vuex                             from 'vuex'
import * as TS                          from "@/../types/myTypes"

// -- =====================================================================================

let state: state = {
                                             
    font            : "Amiri-Regular"       ,
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
    cloud           : []                    ,
    earth           : []                    ,
    bugPTCD         : []                    ,
    comments        : []                    ,
                                             
    cakeBound       : {}                    ,
    routeStack      : []                    ,
                                             
    db_ver          : 0                     ,
}

Vue.use(Vuex);
export default new Vuex.Store( { state: state } ) ;

// -- =====================================================================================

interface state {
                                             
    font            : string                ,
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
    cloud           : TS.earthRaw[][]       ,
    earth           : TS.earthRaw[]         ,
    bugPTCD         : TS.hadithCell[]       ,
    comments        : string[]              ,
    cakeBound       : TS.CakeBound          ,
                                             
    routeStack      : string[]              ,
                                             
    db_ver          : number                ,
}

interface appConfig {
                                             
        theme       : TS.ThemeName          ,
        darkMode    : boolean               ,
                                             
}

// -- =====================================================================================
