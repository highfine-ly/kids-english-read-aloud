exports.handler = async function(event) {
  const token = process.env.MCP_TOKEN;
  console.log("===DEBUG token===", token); // 新增这一行
  const MCP_URL = "https://docs.qq.com/openapi/mcp";
  // ...后面代码不动


  // ========== 下面这两行就是要填两个文档ID的地方 ==========
  const wordFileId = "DQmtjbU1jQk1jempt";
  const sentenceFileId = "DQmRUUWhMaFJsRVB1";
  // ========================================================

  // 请求单词库
  const respWord = await fetch(MCP_URL, {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      jsonrpc:"2.0",
      id:1,
      method:"tools/call",
      params:{
        name:"get_content",
        arguments:{
          file_id: wordFileId
        }
      }
    })
  })
  const wordData = await respWord.json();

  // 请求例句库
  const respSentence = await fetch(MCP_URL, {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      jsonrpc:"2.0",
      id:2,
      method:"tools/call",
      params:{
        name:"get_content",
        arguments:{
          file_id: sentenceFileId
        }
      }
    })
  })
  const sentenceData = await respSentence.json();

  // 合并两份数据返回
  return {
    statusCode:200,
    body:JSON.stringify({
      wordLib: wordData,
      sentenceLib: sentenceData
    })
  }
}
