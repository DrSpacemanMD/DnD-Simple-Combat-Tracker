    
	var Health = {};
	var SelectedIndex=-1;
	var selection = false;
    function AddToList() {
    	//Add to the list..
    	var t = document.querySelector('#GameElement');
    	var name = document.getElementById("InputName").value;
    	var Init = document.getElementById("InputInitiative").value;
		var InputName = document.getElementById("InputName").value;
		var InputInit = document.getElementById("InputInitiative").value;
		var InputHealth = document.getElementById("InputHealth").value;



		if (InputName == "")
			{
			alert("Missing Input Name");  	
			return; 
			}
		if (InputInit == "")
			{
			alert("Missing Initiative Value");  	
			return; 
			}
		if (InputHealth == "")
			{
			alert("Missing Health Value");  	
			return; 
			}
		if(isNaN(InputInit) == true )
			{
			alert("Initiative value must be a number");  	
			return; 
			}
		if(isNaN(InputHealth) == true)
			{
			alert("Health Value must be a number");  	
			return; 
			}
		if (parseFloat(InputHealth)<=0)
			{
			alert("Health must be greater than 0");  	
			return; 
			}
		if (parseFloat(InputInit)<=0)
			{
			alert("Initiative must be greater than 0");  	
			return; 
			}

		document.getElementById("InputName").value ="";
		document.getElementById("InputInitiative").value ="";
		document.getElementById("InputHealth").value ="";


		t.content.querySelector('#name').innerHTML  ="Name: " + InputName;
    	t.content.querySelector('#initiative').innerHTML  ="Initiative: " + InputInit;
    	t.content.querySelector('#health').value  = InputHealth;
    	var GElist = document.getElementById("GameElementList");
	 	var clone = document.importNode(t.content, true);
	 	



	 	//Reorder the list
	 	var ElementsInPlay = document.getElementById("GameElementList").querySelectorAll(".GameElementDiv");  
	 	
	 	if (ElementsInPlay.length > 0)
	 	{
	 		var NodeToUse;
	 		for (var i = 0; i < ElementsInPlay.length; i++) 
			 	{
			 		
			 		var InitTxt = ElementsInPlay[i].querySelectorAll("#initiative")[0].innerHTML.split(" ")[1] ;
			 		var NewElem = parseFloat(InputInit);
			 		var ExistingElem = parseFloat(InitTxt);
			 		if (NewElem>ExistingElem)
			 		{
			 			NodeToUse = ElementsInPlay[i];
			 			if (SelectedIndex > -1 && SelectedIndex >= i)
			 				SelectedIndex+=1;
			 			break;
			 		}
			 	}
			GElist.insertBefore(clone,NodeToUse);	

	 	}
	 	else
	 	{
	 	GElist.appendChild(clone);	
	 	}
	 	document.getElementById("InputName").focus()



	 }

 	function AdjustHealth(Delta,el) 
 	{
 		var HealthFloat = parseFloat(el.parentElement.querySelectorAll("#health")[0].value)+Delta;
 		if (HealthFloat<=0)
 			HealthFloat=0;
 		el.parentElement.querySelectorAll("#health")[0].value = HealthFloat;
 	}
    
    function RemoveElement(el)
    {
    	if (el.parentElement.style.backgroundColor=="DarkRed")
    		ProgressTurn(1);
    	el.parentElement.remove();
		var ElementsInPlay = document.getElementById("GameElementList").querySelectorAll(".GameElementDiv");  
		for (var i = 0; i < ElementsInPlay.length; i++) 
		{
			if (ElementsInPlay[i].style.backgroundColor == "DarkRed")
			{
				SelectedIndex=i;
				break;
			}
		}

    	
    }

    function ClearAllElements()
    {
	 	var ElementsInPlay = document.getElementById("GameElementList").querySelectorAll(".GameElementDiv");  
    	for (var i = 0; i < ElementsInPlay.length; i++) 
			{
				ElementsInPlay[i].remove();
			}
		SelectedIndex=-1;
    }

    function ValidateInput(el)
    {
    	var TextRemoved = el.value.replace(/[^0-9+-]/g,'');
    	var MathString=[];
    	var TempString="";
		for (var x = 0; x < TextRemoved.length; x++)
		{
			if (TextRemoved[x]!="-" && TextRemoved[x]!="+")
			{
				TempString+=TextRemoved[x]
			}
			else
			{
				if (TempString!="")
					MathString.push(TempString);
				MathString.push(TextRemoved[x]);				
				TempString=""
			}

			if (x == TextRemoved.length-1 && TextRemoved[x]!="-" && TextRemoved[x]!="+" && TextRemoved[x]!="")
			{
				MathString.push(TempString);			
				TempString=""
			}
		}

		//Check the string
		for (var x = 1; x < MathString.length; x++)
		{
			if (MathString[x]== "+" || MathString[x]== "-")
			{
				if (MathString[x-1]== "+" || MathString[x-1]== "-" )
				{
					alert("Error in health field")
				}
			}
		}
		if (MathString[MathString.length-1]== "+" || MathString[MathString.length-1]== "-" )
		{
			alert("Error in health field")
		}

		var Total = parseFloat(MathString[0]);

		for (var x = 2; x < MathString.length; x+=2)
		{
			if (MathString[x-1]=="+")
			{
				Total+=parseFloat(MathString[x]);
			}
			if (MathString[x-1]=="-")
			{
				Total-=parseFloat(MathString[x]);
			}
		}

		if (Total < 0)
			Total=0;

		el.value = Total;
    }

    function ProgressTurn(Adjustment)
    {


    		  var ElementsInPlay = document.getElementById("GameElementList").querySelectorAll(".GameElementDiv");  
	 		  if (ElementsInPlay.length == 0)
	 		  	return;
	 		  if (SelectedIndex != -1)
	 		  {
	 		  	ElementsInPlay[SelectedIndex].style.backgroundColor="grey"
	 		  }
	 		  SelectedIndex+=Adjustment;
	 		  if (SelectedIndex >= ElementsInPlay.length)
	 		  	SelectedIndex=0;

	 		  if (SelectedIndex < 0)
	 		  	SelectedIndex=ElementsInPlay.length-1;

	 		  ElementsInPlay[SelectedIndex].style.backgroundColor="DarkRed";
	 		  ElementsInPlay[SelectedIndex].scrollIntoView();
    }

 document.onkeydown = function(event) 
 {
        switch (event.keyCode) {
           case 40:
           	  ProgressTurn(1)
              break;
           case 38:
           	  ProgressTurn(-1)
              break;
           case 46:
           	  {
           	  	var ElementsInPlay = document.getElementById("GameElementList").querySelectorAll(".GameElementDiv");  
           	  	RemoveElement(ElementsInPlay[SelectedIndex].childNodes[11]);
           	  	break;
           	  }
              

        }
    };

