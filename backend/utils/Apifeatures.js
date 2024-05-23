class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword, //it will search the name of the product
                $options: 'i'
            }
        }:{}
         const query = this.query.find({...keyword})
         return this;
        }
    filter(){
        const queryCopy = {...this.queryString} //So that original query str not get disturbed
        
        //Removing some fields for category
        const removeFields=["keyword","page","limit"];//This should be ignored as we are using them in other functions , like we used keyword in search function
        removeFields.forEach(key=> delete queryCopy[key])
        
        
        //Filter for price and rating
        let queryStr = JSON.stringify(queryCopy)//Converting object to string
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)//to add $ sign before gt,gte,lt,lte, as mongodb needs it to find

        this.query = this.query.find(JSON.parse(queryStr)) //This will convert the string to object and find the product
        return this;

    }    
    
    pagination(resultPerPage){
      const CurrentPageNo=this.queryString.page
      const skip = resultPerPage*(CurrentPageNo-1) // so if we are on page 2 then it will skip 10*(2-1)=10 products and then show next 10 products from 11

      this.query=this.query.limit(resultPerPage).skip(skip)//this.query is Product.find() so it will show all products then 
      //This will limit the number of products to be shown and skip the products that are not to be shown
      // if we are on page 5 then it will skip 10*(5-1)=40 products and then show next 10 products from 41..
       return this;
    }
}

module.exports= ApiFeatures;