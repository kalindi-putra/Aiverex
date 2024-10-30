import React, { useMemo, useState, useEffect, useRef} from 'react';
import loader from '@monaco-editor/loader';
import { Button, Divider, Popover, Segmented, Input} from 'antd';
import ReactDOM from 'react-dom/client';
import { edit } from 'brace';
import { Card, Modal, Col, Row } from 'antd';
import { render } from 'react-dom';
import { contentQuotesLinter } from '@ant-design/cssinjs/lib/linters';
import { ExclamationCircleOutlined } from '@ant-design/icons';


function getCode() {
  return [
    'import numpy as np', 'import pandas as pd', '', 'def square(x):', 
    '    return x ** 2', '', 'data = [1, 2, 3, 4, 5]', 'squared_data = [square(x) for x in data]'
    , 'print(squared_data)'].join('\n');
}

function MyEditor(props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [modalContent, setModalContent] = useState(null);
    const [position, setPosition] = useState('1');
    const [editor1, setEditor] = useState(null);
    const [dec, setDecorator] = useState(null);
    const [submittedLines, setSubmittedLines] = useState([])
    const ref = useRef(null);
    const editorRef = useRef(null);
    const decorationsRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    // setDecorator()
    function addGlyph(input, lineNumber) {
      // console.log(input)
      const markdownString = {
        value: `## Comment 
`+input,
        isTrusted: true,
        supportThemeIcons: true,
      };
      var decorations = editor1.createDecorationsCollection( [
        {
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          options: {
            isWholeLine: true,
            className: "myContentClass",
            glyphMarginClassName: "myGlyphMarginClass",
            glyphMarginHoverMessage: markdownString
          },
        },
      ]);
      dec.set(decorations);
      setInputValue("");
      // decorator.append(
      //   {
      //     range: new monaco.Range(lineNumber, 1, lineNumber, 1),
      //     options: {
      //       isWholeLine: true,
      //       className: "myContentClass ContentClass",
      //       glyphMarginClassName: "myGlyphMarginClass GlyphClick",
      //     },
      //   },
      // );
    
    };
    
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleCancel = (e) => {
        console.log(e);
        console.log(ref);
        if(ref.current && !ref.current.contains(e.target))
        {
        setModalVisible(false);
    }
      };
  useEffect(() => {
    loader.init().then((monaco) => {
      // Register a new language
      // monaco.languages.register({ id: 'mySpecialLanguage' });

      // Register a tokens provider for the language
      // monaco.languages.setMonarchTokensProvider('mySpecialLanguage', {
      //   tokenizer: {
      //     root: [
      //       [/\[error.*/, 'custom-error'],
      //       [/\[notice.*/, 'custom-notice'],
      //       [/\[info.*/, 'custom-info'],
      //       [/\[[a-zA-Z 0-9:]+\]/, 'custom-date'],
      //     ],
      //   },
      // });

      // // Define a new theme that contains only rules that match this language
      // monaco.editor.defineTheme('myCoolTheme', {
      //   base: 'vs',
      //   inherit: false,
      //   rules: [
      //     { token: 'custom-info', foreground: '808080' },
      //     { token: 'custom-error', foreground: 'FF0000', fontStyle: 'bold' },
      //     { token: 'custom-notice', foreground: 'FFA500' },
      //     { token: 'custom-date', foreground: '008800' },
      //   ],
      //   colors: {
      //     'editor.foreground': '#000000',
      //   },
      // });

      // // Register a completion item provider for the new language
      // monaco.languages.registerCompletionItemProvider('mySpecialLanguage', {
      //   provideCompletionItems: () => {
      //     var suggestions = [
      //       {
      //         label: 'simpleText',
      //         kind: monaco.languages.CompletionItemKind.Text,
      //         insertText: 'simpleText',
      //       },
      //       {
      //         label: 'testing',
      //         kind: monaco.languages.CompletionItemKind.Keyword,
      //         insertText: 'testing(${1:condition})',
      //         insertTextRules:
      //           monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      //       },
      //       {
      //         label: 'ifelse',
      //         kind: monaco.languages.CompletionItemKind.Snippet,
      //         insertText: [
      //           'if (${1:condition}) {',
      //           '\t$0',
      //           '} else {',
      //           '\t',
      //           '}',
      //         ].join('\n'),
      //         insertTextRules:
      //           monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      //         documentation: 'If-Else Statement',
      //       },
      //     ];
      //     return { suggestions: suggestions };
      //   },
      // });

      const container = document.getElementById('container');
      // function lineNumbersFunc(originalLineNumber) {
      //   var map = [
      //     "O",
      //     "I",
      //     "II",
      //     "III",
      //     "IV",
      //     "V",
      //     "VI",
      //     "VII",
      //     "VIII",
      //     "IX",
      //     "X",
      //   ];
      //   if (originalLineNumber < map.length) {
      //     return map[originalLineNumber];
      //   }
      //   return originalLineNumber;
      // }
      if (!container.children.length) {
        var editor = monaco.editor.create(document.getElementById('container'), {
          theme: 'vs-dark',
          value: props.gitContent||getCode(),
          language:'javascript',
          readOnly: true,
          glyphMargin: true,
          // lineNumbers: lineNumbersFunc,

        });
        editorRef.current = editor;
        // const decorationsRef = useRef(null);
        setEditor(editor);
        const markdownString = {
          value: '# Hello _Monaco_!',
          isTrusted: true,
          supportThemeIcons: true,
        };
        var decorations = editor.createDecorationsCollection([
          {
            range: new monaco.Range(1, 1, 1, 1),
            options: {
              isWholeLine: true,
              className: "myContentClass",
              glyphMarginClassName: "myGlyphMarginClass",
              glyphMarginHoverMessage: markdownString
            },
          },
        ]);
        decorationsRef.current = decorations;
        setDecorator(editor.createDecorationsCollection([]));
        // editor.revealPositionInCenter({ lineNumber: 5, column: 2 });
        editor.onDidChangeCursorSelection((e) => {
            // console.log(JSON.stringify(e));
        //    ReactDOM.createRoot(<Card title="Card title" bordered={false} style={{ width: 300 }}>
        //    <p>Card content</p>
        //    <p>Card content</p>
        //    <p>Card content</p>
        //  </Card>);
        // console.log(ReactDOM.findDOMNode(this));
            // startLineNumber endLineNumber
            const position = e.selection.startLineNumber;
            setPosition(position);
            const content = <div><p>Modal content for line {position}</p></div>;
            setModalVisible(true);
            setModalContent(content);
            const lineContent = (
              <span>
                Line {position}
                {submittedLines.includes(position) && (
                  <ExclamationCircleOutlined style={{ marginLeft: 5, color: 'red' }} />
                )}
              </span>
            );
            // console.log(lineContent,'dd')
            
        });
        
        // var glyphMarginClickHandler = function (e) {
        //   var target = e.target;
        //   console.log(target.className);
        //   if (target.className === "myGlyphMarginClass") {
        //     console.log("hello");
        //   }
        // };
        
        // var glyphMarginElement = document.querySelector(
        //   ".monaco-editor .margin .margin-view-overlays .current-line .glyph-margin"
        // );
        // console.log(glyphMarginElement);
        // if (glyphMarginElement) {
        //   glyphMarginElement.addEventListener("click", glyphMarginClickHandler);
        // }

        editor.onMouseDown((e) => {
          const target = e.target;
          if (target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
            console.log(target.element);
          }});

        // editor.changeViewZones((accessor) => {
        //   const domNode = document.createElement('div');
        //   domNode.innerHTML = renderToString(lineContent);
        //   const disposable = accessor.addZone({ afterLineNumber: position, heightInLines: 1, domNode });
        //   // Cleanup the zone when component unmounts or the zone needs to be updated
        //   return () => disposable.dispose();
        // });
      
      }
    });
    // this.monacoEditor.updateOptions({readOnly: false});
  }, []);

  
  


  return (  
  <Row style={{width:'100%',display:'flex',gap:'10px',margin:'0px'}}>
 
  <div id="container" style={{height:'80vh',  textAlign: 'left',minWidth:'800px' }}>
</div>
{modalVisible && (
    <Card
      ref={ref}
      visible={modalVisible}
      style={{
        background: '#1E1E1E',
            borderRadius: '30px',
            color: "white",
            padding:10,
            height:'100%',
      }}
      title={<h2 style={{color: "white"}}>Line No {position}</h2>}
      // onCancel={handleCancel}
      
      footer={null}
    >
      <h3>Metrics</h3>
      <br />
      <h5>Time Complexity: <span > O(n) </span> </h5>
      <h5>Space Complexity: <span > n^2 </span> </h5>
      <Input placeholder="Comment" value={inputValue} onChange={handleInputChange} />
      <br />
      <br />
      <Button type="primary" shape="round"   style={{
      width: '100%',
      textAlign: 'center',
      background:'#6B11DC',
    }} 
    onClick={() => {
      // console.log("Hello");
      // setSubmittedLines((prevLines) => [...prevLines, position]);
      addGlyph(inputValue, position)
      // var decorations = editor.createDecorationsCollection([
      //   {
      //     range: new monaco.Range(1, 1, 1, 1),
      //     options: {
      //       isWholeLine: true,
      //       className: "myContentClass ContentClass",
      //       glyphMarginClassName: "myGlyphMarginClass GlyphClick",
      //     },
      //   },
      // ]);
      setModalVisible(false);
    }}
    >Submit</Button>
    </Card>
  )}
</Row>
);
}

export default MyEditor;