function ob_TableToggleType(pThis){var l_HolderTR=html_CascadeUpTill(pThis,"TR"),l_Inputs=l_HolderTR.getElementsByTagName("input"),l_Selects=l_HolderTR.getElementsByTagName("select"),l_Size=l_Inputs[1],l_Scale=l_Inputs[2],l_Comments=l_Inputs[3],l_DataType=pThis.value,l_Identity=l_Selects[1];"0"==l_DataType?html_HiddenElement(l_Comments):html_VisibleElement(l_Comments),"VARCHAR2:NVARCHAR2:RAW:CHAR:NCHAR:TIMESTAMP:TIMESTAMP WITH TIME ZONE:TIMESTAMP WITH LOCAL TIME ZONE".indexOf(l_DataType)>=0?(html_VisibleElement(l_Scale),html_HiddenElement(l_Size),html_HiddenElement(l_Identity),l_Size.value=""):"FLOAT:INTERVAL YEAR TO MONTH".indexOf(l_DataType)>=0?(html_VisibleElement(l_Size),html_HiddenElement(l_Scale),l_Scale.value="","FLOAT"==l_DataType&&html_VisibleElement(l_Identity)):"NUMBER:INTERVAL DAY TO SECOND".indexOf(l_DataType)>=0?(html_VisibleElement(l_Scale),html_VisibleElement(l_Size),"NUMBER"==l_DataType&&html_VisibleElement(l_Identity)):(html_HiddenElement(l_Scale),html_HiddenElement(l_Size),html_HiddenElement(l_Identity),l_Scale.value="",l_Size.value="")}function addTableRow2(pThis,pThat,pNum){var tt=html_GetElement(pThat),ttb=tt.getElementsByTagName("tbody")[0],l_newRows=[];for(i=0;i<pNum;i++){var ogTR=tt.rows[tt.rows.length-1],trClone=ogTR.cloneNode(!0);document.all?(myNewRow=tt.insertRow(tt.rows.length),oReplace=myNewRow.replaceNode(trClone)):ttb.appendChild(trClone),l_newRows[l_newRows.length]=trClone;for(var tSelects=trClone.getElementsByTagName("select"),iSelects=0;iSelects<tSelects.length;iSelects++)tSelects[iSelects].selectedIndex=0,tSelects[iSelects].disabled="";for(var tInputs=trClone.getElementsByTagName("input"),iInputs=0;iInputs<tInputs.length;iInputs++)"text"==tInputs[iInputs].type&&(tInputs[iInputs].value="",tInputs[iInputs].disabled="")}var lRowNumSpan$=$('span[id^="r"]',l_newRows),lOldRowNum=parseInt(lRowNumSpan$.text(),10),lNewRowNum=lOldRowNum+1;return lRowNumSpan$.attr("id","r"+lNewRowNum),lRowNumSpan$.text(lNewRowNum),$(":input",l_newRows).each(function(){if(this.id){var lNewId=this.id.replace(lOldRowNum,lNewRowNum);this.id=lNewId}if($(this).filter("[aria-labelledby]").length>0){var lNewAttr=$(this).attr("aria-labelledby").replace("r"+lOldRowNum,"r"+lNewRowNum);$(this).attr("aria-labelledby",lNewAttr)}}),$(':input[id^="tblname"]',l_newRows).focus(),l_newRows}function ob_TableAddColumn(pThis,pThat,pNum){for(var newRows=addTableRow2(pThis,pThat,pNum),i=0;i<newRows.length;i++){var l_Inputs=newRows[i].getElementsByTagName("input");html_HiddenElement(l_Inputs[1]),html_HiddenElement(l_Inputs[2])}}function ob_TablePrevInit(){for(var lRows=(html_GetElement("htmldbNewTable"),html_GetElement("htmldbNewTable").rows),i=1;i<lRows.length;i++){var lTemp=lRows[i].getElementsByTagName("SELECT")[0];ob_TableToggleType(lTemp)}}function ob_createTableSeq(val){var pkVal="";"NEW_SEQUENCE"==val?(html_HideItemRow("P604_EXISTING_SEQUENCE"),html_HideItemRow("P604_PK2"),html_ShowItemRow("P604_PK1"),html_ShowItemRow("P604_NEW_SEQUENCE"),html_ShowItemRow("P604_PK1_NAME"),pkVal=html_GetElement("P604_PK1").value):"EXISTING_SEQUENCE"==val?(html_ShowItemRow("P604_EXISTING_SEQUENCE"),html_HideItemRow("P604_NEW_SEQUENCE"),html_HideItemRow("P604_PK2"),html_ShowItemRow("P604_PK1"),html_ShowItemRow("P604_PK1_NAME"),pkVal=html_GetElement("P604_PK1").value):"NOT_GENERATED:IDENTITY".indexOf(val)>=0?(html_HideItemRow("P604_EXISTING_SEQUENCE"),html_HideItemRow("P604_NEW_SEQUENCE"),html_ShowItemRow("P604_PK1"),html_ShowItemRow("P604_PK2"),html_ShowItemRow("P604_PK1_NAME"),pkVal=html_GetElement("P604_PK1").value):"NONE"==val&&(html_HideItemRow("P604_EXISTING_SEQUENCE"),html_HideItemRow("P604_NEW_SEQUENCE"),html_HideItemRow("P604_PK1_NAME"),html_HideItemRow("P604_PK1"),html_HideItemRow("P604_PK2"));var get=new htmldb_Get(null,4500,"APPLICATION_PROCESS=1504518033640244",0);get.add("P604_EXISTING_SEQUENCE",html_GetElement("P604_EXISTING_SEQUENCE").value),get.add("P604_NEW_SEQUENCE",html_GetElement("P604_NEW_SEQUENCE").value),get.add("P604_PK2",html_GetElement("P604_PK2").value);html_GetElement("P604_PK1").value;get.add("P604_PK1",pkVal),get.add("P604_PK1_NAME",html_GetElement("P604_PK1_NAME").value);html_RadioValue("P604_PK_TYPE");get.add("P604_PK_TYPE",html_RadioValue("P604_PK_TYPE"));get.get();get=null}function ob_createTableGetFK(){var get=new htmldb_Get(null,4500,"APPLICATION_PROCESS=1504518033640244",0);get.add("P145_FK_TABLE",html_GetElement("P145_FK_TABLE").value);get.get();get=null}function ob_createTableFKCols(){var refTable=html_GetElement("P145_FK_REF_TABLE").value,obSchema=html_GetElement("P145_SCHEMA").value,cols=html_GetElement("P145_FK_REF_COLUMN");if(""!=refTable){var get=new htmldb_Get(null,4500,"APPLICATION_PROCESS=29884608907915599",0);get.add("P145_FK_REF_TABLE",refTable),get.add("OB_SCHEMA",obSchema);var ret=get.get();if("NONE"==ret)return void html_HideItemRow(cols);cols.options.length=0;var nCols=ret.split(";");html_GetElement("P145_FK_REF_TABLE").value=nCols[0];var sOpt="";for(i=1;i<nCols.length;i++)""!=nCols[i]&&(sOpt=new Option(nCols[i],nCols[i],!1,!1),cols.options[cols.options.length]=sOpt);html_ShowItemRow(cols),get=null,Shuttle2=new dhtml_ShuttleObject("P145_FK_REF_COLUMN","P145_FK_REF_COLUMN_SEL")}else html_HideItemRow(cols)}function ob_getOpts(sList){sList=html_GetElement(sList).options;for(var dOptions="",intLoop=0;intLoop<sList.length;intLoop++)intLoop>0&&(dOptions+=","),dOptions+=sList[intLoop].value;return dOptions}function ob_addFk(){var toTable=html_GetElement("P145_FK_REF_TABLE").value,toCols=ob_getOpts("P145_FK_REF_COLUMN_SEL"),fromCols=ob_getOpts("P145_FK_THIS_COLUMN_SEL"),fkName=html_GetElement("P145_FK_NAME").value,fkAction=html_RadioValue("P145_FK_ACTION"),get=(html_GetElement("htmldbNewTable"),new htmldb_Get(null,4500,"APPLICATION_PROCESS=172369000165936003",0));get.add("P145_FK_REF_TABLE",toTable),get.add("P145_TO_COLS",toCols),get.add("P145_FROM_COLS",fromCols),get.add("P145_FK_NAME",fkName),get.add("P145_FK_ACTION",fkAction);var ret=get.get();ret.indexOf("HTMLDB:ERROR")>0?html_GetElement("htmldbMessageHolder").innerHTML=ret:(html_GetElement("htmldbNewTable").parentNode.innerHTML=ret,html_GetElement("P145_FK_REF_TABLE").value="",html_GetElement("P145_FK_REF_COLUMN_SEL").options.length=0,g_fkCount+=1,html_GetElement("P145_FK_NAME").value=html_GetElement("P145_TABLE_NAME").value+"_fk"+g_fkCount,html_HideItemRow("P145_FK_REF_COLUMN"),html_HideItemRow("P145_FK_REF_COLUMN_SEL"),html_RemoveAllChildren("htmldbMessageHolder"),Shuttle.reset())}function ob_rmFkRow(rowId){var get=new htmldb_Get(null,4500,"APPLICATION_PROCESS=172867829404455433",0);get.add("P145_FK_SEQ",rowId);get.get();x=html_GetElement("fkTab_"+rowId),x.parentNode.removeChild(x)}function ob_addCons(){var conName=html_GetElement("P149_NAME").value,uCols=ob_getOpts("P149_SEL_COLS"),chkCons=html_GetElement("P149_CHECK").value,consType=html_RadioValue("P149_CONST_TYPE"),get=new htmldb_Get(null,4500,"APPLICATION_PROCESS=176127519858657209",0);get.add("P149_NAME",conName),get.add("P149_SEL_COLS",uCols),get.add("P149_CHECK",chkCons),get.add("P149_CONST_TYPE",consType);var ret=get.get();ret.indexOf("HTMLDB:ERROR")>0?html_GetElement("htmldbMessageHolder").innerHTML=ret:(html_GetElement("htmldbNewTable").parentNode.innerHTML=ret,html_GetElement("P149_CHECK").value="",html_GetElement("P149_SEL_COLS").options.length=0,"C"==consType?(g_conCount+=1,html_GetElement("P149_NAME").value=html_GetElement("P149_TABLE_NAME").value+"_ck"+g_conCount):(g_ukCount+=1,html_GetElement("P149_NAME").value=html_GetElement("P149_TABLE_NAME").value+"_uk"+g_ukCount),html_GetElement("htmldbMessageHolder").innerHTML="",Shuttle.reset())}function ob_rmConsRow(rowId){var get=new htmldb_Get(null,4500,"APPLICATION_PROCESS=176138206577719675",0);get.add("P149_CONS_SEQ",rowId);get.get();x=html_GetElement("consTab_"+rowId),x.parentNode.removeChild(x)}function ob_DelayTableSearch(){gLastFilteredKey=new Date,setTimeout(delayedFilter,250)}function delayedFilter(){new Date-gLastFilteredKey>250?ob_createTableFKCols():setTimeout(delayedFilter,250)}function p149_RadioTog(){var curVal=html_RadioValue("P149_CONST_TYPE");"C"==curVal?(html_ShowItemRow("P149_CHECK"),html_HideItemRow("P149_AVAIL_COLS"),html_HideItemRow("P149_SEL_COLS"),html_GetElement("P149_NAME").value=html_GetElement("P149_TABLE_NAME").value+"_ck"+g_conCount):(html_HideItemRow("P149_CHECK"),html_ShowItemRow("P149_AVAIL_COLS"),html_ShowItemRow("P149_SEL_COLS"),html_GetElement("P149_NAME").value=html_GetElement("P149_TABLE_NAME").value+"_uk"+g_ukCount)}function ob_ToggleNN(obj){var l_NextSib=obj.nextSibling;null!=l_NextSib&&3==l_NextSib.nodeType&&(l_NextSib=l_NextSib.nextSibling),1==obj.checked?(obj.value="Y",l_NextSib.value="Y"):(obj.value="N",l_NextSib.value="N")}function ob_table_getColOrder(){var l_item=html_GetElement("P602_COL_ORDER"),lTable=html_GetElement("htmldbNewTable"),l_Inputs=lTable.getElementsByTagName("input"),i=0,ret="";for(i=0;i<l_Inputs.length;i++)"colname"==l_Inputs[i].id&&(ret=ret+l_Inputs[i].value+";");return l_item.value=ret,!0}function ob_delayOrder(){setTimeout(ob_table_getColOrder,500)}function ob_IeRowFixStart(pThis){if(document.all){for(var l_row=html_CascadeUpTill(pThis,"TR"),l_Items=html_Return_Form_Items(l_row),l_return=!1,i=0;i<l_Items.length;i++)"checkbox"==l_Items[i].type&&l_Items[i].checked&&(l_return=!0);return l_return}}function ob_IeRowFixFinish(pThis,pChecked){if(document.all)for(var l_Items=html_Return_Form_Items(pThis),i=0;i<l_Items.length;i++)"checkbox"==l_Items[i].type&&(l_Items[i].checked=pChecked)}function ob_RowUp(pThis){var lCheck=ob_IeRowFixStart(pThis),lRow=html_RowUp(pThis);return ob_delayOrder(),ob_IeRowFixFinish(lRow,lCheck),!1}function ob_RowDown(pThis){var lCheck=ob_IeRowFixStart(pThis),lRow=html_RowDown(pThis);return ob_delayOrder(),ob_IeRowFixFinish(lRow,lCheck),!1}function ob_setDataType(){var lItemPrefix="P"+$v("pFlowStepId")+"_",lDataType=$v(lItemPrefix+"DATATYPE");"VARCHAR2:NVARCHAR2:RAW:CHAR:NCHAR".indexOf(lDataType)>=0?($x_disableItem(lItemPrefix+"LENGTH",!1),$x_disableItem([lItemPrefix+"PRECISION",lItemPrefix+"SCALE"],!0),$x_Value([lItemPrefix+"PRECISION",lItemPrefix+"SCALE"],"")):"FLOAT:INTERVAL YEAR TO MONTH".indexOf(lDataType)>=0?($x_disableItem(lItemPrefix+"PRECISION",!1),$x_disableItem([lItemPrefix+"LENGTH",lItemPrefix+"SCALE"],!0),$x_Value([lItemPrefix+"LENGTH",lItemPrefix+"SCALE"],"")):"TIMESTAMP:TIMESTAMP WITH TIME ZONE:TIMESTAMP WITH LOCAL TIME ZONE".indexOf(lDataType)>=0?($x_disableItem(lItemPrefix+"SCALE",!1),$x_disableItem([lItemPrefix+"LENGTH",lItemPrefix+"PRECISION"],!0),$x_Value([lItemPrefix+"LENGTH",lItemPrefix+"PRECISION"],"")):"NUMBER:INTERVAL DAY TO SECOND".indexOf(lDataType)>=0?($x_disableItem([lItemPrefix+"PRECISION",lItemPrefix+"SCALE"],!1),$x_disableItem(lItemPrefix+"LENGTH",!0),$x_Value([lItemPrefix+"LENGTH"],"")):($x_disableItem([lItemPrefix+"LENGTH",lItemPrefix+"PRECISION",lItemPrefix+"SCALE"],!0),$x_Value([lItemPrefix+"LENGTH",lItemPrefix+"PRECISION",lItemPrefix+"SCALE"],""))}var g_conCount=1,g_fkCount=1,g_ukCount=1,gLastFilteredKey;