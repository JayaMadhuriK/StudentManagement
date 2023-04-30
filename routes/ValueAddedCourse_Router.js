const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app6 = express.Router();

app6.use(bodyParser.json());
//valueaddedYr1table
app6.route('/valueaddedYr1')
.get((req,res)=>{
    conn.query('select * from Yr_1',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Name_Of_ValueAddedCourses_Offered,bt.Course_Code,bt.Yr_Of_Offering,bt.Num_Of_times_Offered_DuringSameYr,bt.Duration_Of_Course,bt.Num_Of_Students_Enrolled_In_Yr,bt.Num_Of_Students_Completed];
    conn.query('insert into Yr_1 values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table Yr_1',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app6.route('/valueaddedYr1/:CourseCode')
.get((req,res)=>{
    conn.query('select * from Yr_1 where Course_Code = ?',[req.params.CourseCode],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from Yr_1 where Course_Code= ?',[req.params.CourseCode],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.CourseCode+' deleted');
          }
       });
})
   
.put((req,res)=>{
   
    var bt = req.body
    conn.query('update Yr_1 set ? where Course_Code ='+req.params.CourseCode,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});
//valueaddedYr2table
app6.route('/valueaddedYr2')
.get((req,res)=>{
    conn.query('select * from Yr_2',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Name_Of_ValueAddedCourses_Offered,bt.Course_Code,bt.Yr_Of_Offering,bt.Num_Of_times_Offered_DuringSameYr,bt.Duration_Of_Course,bt.Num_Of_Students_Enrolled_In_Yr,bt.Num_Of_Students_Completed];
    conn.query('insert into Yr_2 values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table Yr_2',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app6.route('/valueaddedYr2/:CourseCode')
.get((req,res)=>{
    conn.query('select * from Yr_2 where Course_Code = ?',[req.params.CourseCode],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from Yr_2 where Course_Code= ?',[req.params.CourseCode],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.CourseCode+' deleted');
          }
       });
})
   
.put((req,res)=>{
   
    var bt = req.body
    conn.query('update Yr_2 set ? where Course_Code ='+req.params.CourseCode,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});
//valueaddedYr3table
app6.route('/valueaddedYr3')
.get((req,res)=>{
    conn.query('select * from Yr_3',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Name_Of_ValueAddedCourses_Offered,bt.Course_Code,bt.Yr_Of_Offering,bt.Num_Of_times_Offered_DuringSameYr,bt.Duration_Of_Course,bt.Num_Of_Students_Enrolled_In_Yr,bt.Num_Of_Students_Completed];
    conn.query('insert into Yr_3 values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table Yr_3',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app6.route('/valueaddedYr3/:CourseCode')
.get((req,res)=>{
    conn.query('select * from Yr_3 where Course_Code = ?',[req.params.CourseCode],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from Yr_3 where Course_Code= ?',[req.params.CourseCode],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.CourseCode+' deleted');
          }
       });
})
   
.put((req,res)=>{
   
    var bt = req.body
    conn.query('update Yr_3 set ? where Course_Code ='+req.params.CourseCode,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});
//valueaddedYr4table
app6.route('/valueaddedYr4')
.get((req,res)=>{
    conn.query('select * from Yr_4',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Name_Of_ValueAddedCourses_Offered,bt.Course_Code,bt.Yr_Of_Offering,bt.Num_Of_times_Offered_DuringSameYr,bt.Duration_Of_Course,bt.Num_Of_Students_Enrolled_In_Yr,bt.Num_Of_Students_Completed];
    conn.query('insert into Yr_4 values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table Yr_4',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app6.route('/valueaddedYr4/:CourseCode')
.get((req,res)=>{
    conn.query('select * from Yr_4 where Course_Code = ?',[req.params.CourseCode],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from Yr_4 where Course_Code= ?',[req.params.CourseCode],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.CourseCode+' deleted');
          }
       });
})
   
.put((req,res)=>{
   
    var bt = req.body
    conn.query('update Yr_4 set ? where Course_Code ='+req.params.CourseCode,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});
//valueaddedYr5table
app6.route('/valueaddedYr5')
.get((req,res)=>{
    conn.query('select * from Yr_5',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Name_Of_ValueAddedCourses_Offered,bt.Course_Code,bt.Yr_Of_Offering,bt.Num_Of_times_Offered_DuringSameYr,bt.Duration_Of_Course,bt.Num_Of_Students_Enrolled_In_Yr,bt.Num_Of_Students_Completed];
    conn.query('insert into Yr_5 values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table Yr_5',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app6.route('/valueaddedYr5/:CourseCode')
.get((req,res)=>{
    conn.query('select * from Yr_5 where Course_Code = ?',[req.params.CourseCode],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from Yr_5 where Course_Code= ?',[req.params.CourseCode],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.CourseCode+' deleted');
          }
       });
})
   
.put((req,res)=>{
   
    var bt = req.body
    conn.query('update Yr_5 set ? where Course_Code ='+req.params.CourseCode,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});
module.exports = app6;
   