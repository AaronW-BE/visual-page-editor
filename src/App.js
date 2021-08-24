import './App.css';
import VImage from "./page-components/VImage/VImage";
import {createElement, useEffect, useState} from "react";

function VComponentDecorator(WrappedComponent, index) {
  if (WrappedComponent.editMode) {
    return <div key={index} className='v-component-editable'>{createElement(WrappedComponent.component, WrappedComponent.props)}</div>
  }
  return <div key={index}>{createElement(WrappedComponent.component, WrappedComponent.props)}</div>
}

function PageArea() {
  const [vComponentsManifest, setVComponentsManifest] = useState([
    {
      sort: 0,
      editMode: false,
      component: VImage,
      props: {
        src: '123'
      }
    },
    {
      sort: 0,
      editMode: false,
      component: VImage
    },
    {
      sort: 0,
      editMode: false,
      component: VImage
    }
  ])

  let [activeEditCompIndex, setActiveCompIndex] = useState(-1);

  function handleVCompClick(index, e) {
    e.preventDefault();
    e.stopPropagation()
    setActiveCompIndex(index);
    let _manifest = [...vComponentsManifest];
    for (let i = 0; i < _manifest.length; i++) {
      _manifest[i].editMode = (i === index);
    }
    setVComponentsManifest(_manifest);
  }

  function onInputBlur(e) {
    let _manifest = [...vComponentsManifest];
    if (e.target.value) {
      console.log('update v-components manifest...')
      if (!_manifest[activeEditCompIndex].props) {
        _manifest[activeEditCompIndex].props = {}
      }
      _manifest[activeEditCompIndex].props.src = e.target.value;
      setVComponentsManifest(_manifest);
      console.log(vComponentsManifest)
    }
  }

  useEffect(() => {
    document.addEventListener('click', function (e) {
      setActiveCompIndex(-1);
    });
  }, [])
  return (
    <div>
      <div className='v-page-container'>
        {vComponentsManifest.map((comp, index) => {
          return <div key={index} onClick={(e) => handleVCompClick(index, e)}>{VComponentDecorator(comp, index)}</div>
        })}
      </div>
      {
        activeEditCompIndex > -1 ? (
          <div className='v-page-control-panel'>
            <div>
              <label>
                地址：
                <input type="text" onBlur={onInputBlur} />
              </label>
            </div>
          </div>
        ) : null
      }

    </div>
  )
}

function App() {
  return (
    <div className="App">
      <PageArea />
    </div>
  );
}

export default App;
