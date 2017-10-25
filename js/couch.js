const const_url      = "http://localhost:5984"
const const_colecao  = "projetocrud"
var jsonAluno = {}
var jsonResultSearch = {}
var i=0;
var nretorno = -1;

function couchRest(pmetodo, ptype){

// Responsável para comunicação do REST com JavaScript.
// JavaScript + AJAX.

var curl = ""

if(pmetodo == ""){
    curl = const_url+"/"+const_colecao;
}else{
    curl = const_url+"/"+const_colecao+"/"+pmetodo;
}

$.ajax({
        url : curl,
        type : "POST",
        data : JSON.stringify(jsonAluno),
        contentType : "application/json",
        success : function(jsonResultSearch){
            alert(JSON.stringify(jsonResultSearch));
        },
        error : function(error){
            alert(error.error);
        }
       })

return;

}


function AlunoInserir(){      
    
    jsonAluno.nome         = document.getElementById("aluno_nome").value;
    jsonAluno.sobrenome    = document.getElementById("aluno_sobrenome").value;
    jsonAluno.cidade       = document.getElementById("aluno_cidade").value;
    jsonAluno.dtnascimento = document.getElementById("aluno_nascimento").value;
    couchRest("", "POST");
    
    jsonAluno = {};
    return 1;
}


function RedirecionarRelacionarLivro(){
    
    document.location.href = "livro.html";

}

function RedirecionarCadastro(){
    
    document.location.href = "index.html";

}

function AlunoBuscar(){
    
    pnome = prompt("Informe um nome", "Busca de nome");

    jsonAluno.selector = {"nome":pnome};
    jsonAluno.fields = ["nome", "sobrenome"];
    pmetodo = "_find";

    curl = const_url+"/"+const_colecao+"/"+pmetodo;

    $.ajax({
        url : curl,
        type : "POST",
        data : JSON.stringify(jsonAluno),
        contentType : "application/json",
        success : function(result){
            //alert(JSON.stringify(result));
            //alert("fez o acesso");
            jsonResultSearch = result;
            if (jsonResultSearch.docs.length > 0) {
                
            $('#addr'+i).html("<td>"+ (i+1) +"</td><td><input name='nome"       +i+"' type='text' placeholder='Nome'  value='"+jsonResultSearch.docs[0].nome+"'     class='form-control input-md' readonly/> </td>" + 
                                             "     <td><input name='sobrenome"  +i+"' type='text' placeholder='Sobrenome' value='"+jsonResultSearch.docs[0].sobrenome +"' class='form-control input-md' readonly></td> " +
                                             "     <td><input list='livrog1' class='form-control input-list'><datalist id='livrog1'> <option value='Livro A'><option value='Livro B'><option value='Livro C'> <option value='Livro D'><option value='Livro E'></datalist></td>" + 
                                             "     <td><input list='livrog1' class='form-control input-list'><datalist id='livrog1'> <option value='Livro A'><option value='Livro B'><option value='Livro C'> <option value='Livro D'><option value='Livro E'></datalist></td>" );
            $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
            i++;
        
            }else{
                alert("Aluno não encontrado");
            }
        
            jsonResultSearch = {}
        },
        error : function(error){
            alert(error.error);
        }
       })


    jsonAluno = {};
    return 1;

}