const JAVA_KEY = "62";
const CPP_KEY = "53";
const PYTHON_KEY = "70";
const BASE_URL = "http://34.72.83.62/submissions";


function codeEditor(lang_id) {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");

  console.log("id" + lang_id )
  $(document).ready(function () {
    $("button").click(function () {
      let code = editor.getValue();
      $("#ans").html("Loading...");
      console.log(code);
      let data = {
        source_code: code,
        language_id: lang_id,
        number_of_runs: "1",
        stdin: "Judge0",
        expected_output: null,
        cpu_time_limit: "2",
        cpu_extra_time: "0.5",
        wall_time_limit: "5",
        memory_limit: "128000",
        stack_limit: "64000",
        max_processes_and_or_threads: "60",
        enable_per_process_and_thread_time_limit: false,
        enable_per_process_and_thread_memory_limit: false,
        max_file_size: "1024",
      };
      console.log(data)
      let request = $.ajax({
        url: BASE_URL,
        type: "post",
        data: data,
      });

      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      // Callback handler that will be called on success
      request.done(async function (response, textStatus, jqXHR) {
        // Log a message to the console
        console.log("Hooray, it worked!");
        let token = response.token;
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec
        console.log(3, "after 3 seconds");
        let second_request = $.ajax({
          url: BASE_URL + "/"+ token,
          type: "get",
        });
        second_request.done(function (response) {
          console.log(response.stdout);
          $("#ans").html(response.stdout);
        });
      });
    });
  });
  if(lang_id==PYTHON_KEY)
      editor.setValue("def execute(): \n\t for i in range(10):\n\t\t print i \nexecute()")
  //java
  if(lang_id==JAVA_KEY){

      let javacode = `public class Main{
  public static void main(String args[]){
    System.out.println("hello");
  }
}
`;

  editor.setValue(javacode)

  }if(lang_id==CPP_KEY){
      let cppcode = `#include <iostream>
using namespace std;
  int main() {
      cout<<"Hello World"; \n
}`
      editor.setValue(cppcode)
  }


} 
