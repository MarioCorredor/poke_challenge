export const getCardAnimation = ( guessed ) => {

    if ( !guessed ) return;  

    if ( guessed.name ) {
        return 'animate__tada'; 
    }
    return 'animate__headShake'
}