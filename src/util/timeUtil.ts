export default {

    formatTime,
    mapSecsToTimeFormat,
    mapTimeToSecs,

};


// Implementation
export function formatTime(val:string) {
    let nums = val.split('')
                .filter(v=> (v.match(/[0-9]+/)))
                .reverse()
                .filter( (_, idx) => (idx < 6));
    const to2digit = (s: string) => (s.length<2? '0':'' + s);
    let secs = nums.length >=2? `${to2digit( nums[1] + nums[0])}`:
                nums.length >=1? `0${nums[0]}`:-1;

    let mins = nums.length >=4? `${to2digit( nums[3] + nums[2])}`:
               nums.length >=3? `0${nums[2]}`:-1;

    let hours =  nums.length >=6? `${to2digit( nums[5] + nums[4])}`:
                nums.length >=5?  `0${nums[4]}`:-1;
                
    // const validRange = (x:number) => (0 <= x && x<60);
    const validRange = (x:any) => ( x!= -1);
    let hasSecs = validRange(secs);
    let hasMinsAndSecs = hasSecs && validRange(mins);
    let hasMinsAndSecsAndHours = hasMinsAndSecs && validRange(hours);

    return  hasMinsAndSecsAndHours? `${hours}:${mins}:${secs}`:
            hasMinsAndSecs? `00:${mins}:${secs}`:
            hasSecs? `00:00:${secs}`:'';
};

export function mapSecsToTimeFormat (secs: number) {
   let ar = [];
   while (secs > 0) {
        ar.push( Math.floor( secs % 60) );
        secs = Math.floor(secs / 60);
   }
   ar = ar.reverse()
          .map(v => (`${v}`.length < 2? `0${v}`:`${v}`));
   if (ar.length > 3) {
    ar.splice(3, ar.length - 3);
   }

   return formatTime(ar.join(":"));
};

export function mapTimeToSecs(time: string) {
    let nums = time.split(':')
                .filter(v=> (v.match(/[0-9]+/)))
                .filter( (_, idx) => (idx < 3))
                .map(v => (parseInt(v)) )
                .reverse();
    let w = [1, 60, 60 * 60], totalSecs = 0;
    for( let i=0; i<nums.length; i++) {
        totalSecs += w[i] * nums[i];
    }
    return totalSecs;
};