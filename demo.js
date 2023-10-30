let nums1 = [1,3];
let nums2 = [2,4];
var findMedianSortedArrays = function(nums1, nums2) {

    const newArray = [];
    nums1?.map(item=> newArray.push(item));
    nums2?.map(item=> newArray.push(item));
    newArray.sort();
// return newArray;
const mid = Math.floor(newArray?.length/2)
// return mid;
    if(newArray?.length % 2 === 0){
        return (newArray[mid-1]+ newArray[mid])/2;
    }else{
        return newArray[mid];
    }
};

console.log(findMedianSortedArrays(nums1, nums2))