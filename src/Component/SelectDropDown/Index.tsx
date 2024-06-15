import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import clsx from "clsx";
import { MdClose } from "react-icons/md";

export interface SelectDropDownI {
  datas: { id: string; name: string; icon?: any }[];
  placeholder: string;
  onChangeValue: any;
  error?: any;
  name?: string;
  keyToReset?: string;
  openProp?: boolean;
  reset?: Array<any>;
  setReset?: any;
  disabled?: boolean;
  flagIcon?: any;
  isLoader?: boolean;
}

const SelectDropDown = ({
  datas,
  placeholder,
  onChangeValue,
  error,
  name,
  keyToReset = "",
  openProp = true,
  reset,
  setReset,
  disabled = false,
  flagIcon,
  isLoader= false,
}: SelectDropDownI) => {
  const [inputValue, setInputValue] = useState("")
  const [selected, setSelected] = useState<string | undefined | null>(name || "");
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(flagIcon || "");
  const [imageRef, setImageRef] = useState<string[]>(Array.isArray(datas) && !!datas ? datas?.map(() => "loading") : []);

  useEffect(() => {
    setSelected(name)
    setFlag(flagIcon)
  }, [name, flagIcon])

  useEffect(() => {
    if (reset?.includes(keyToReset ?? "")) {
      setInputValue("");
      setSelected("" || name);
      setOpen(false);
      setReset([]);
    }
  }, [reset]);

  const dropDownList = useRef<any>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (!dropDownList?.current?.contains(e?.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {

    var ul = document.querySelector('#workspace-custom-ul');
    var nodes = document.querySelectorAll('#workspace-custom-li');
    var selected_index = 0;

    if(!ul) return;

    if(!nodes) return;

    [].forEach.call(nodes, function(el) {
        // @ts-ignore: Object is possibly 'null'.
        el?.addEventListener('click', function() {
        // @ts-ignore: Object is possibly 'null'.
            select(this);
        })
  });

  function handleKeyDown(e: globalThis.KeyboardEvent){
    
    if (!dropDownList.current?.contains(document.activeElement)) {
      return; // Ignore keydown if focus is outside the dropdown component
    }

    if (e.keyCode === 38) { // up
      select(nodes[selected_index - 1], selected_index - 1);
    }
    if (e.keyCode === 40) { // down
      select(nodes[selected_index + 1], selected_index + 1);
    }
    if (e.keyCode === 13) { // Enter

      const el_data = nodes[selected_index].getAttribute("data-flag");

      if(!el_data) return;
      
      const data = JSON.parse(el_data ?? "{}")?.data;

      if (data?.name?.toLowerCase() !== selected?.toLowerCase()) {
        setSelected(data?.name);
        setFlag(data?.icon)
        setOpen(false);
        setInputValue("");
      }
      onChangeValue(data);
    }
  }

    document.addEventListener('keydown',handleKeyDown);

    function select(el: any, index: number) {
      if (!el) return;

      selected_index = index;

      var elHeight = el.offsetHeight;
      var scrollTop = ul?.scrollTop;
        // @ts-ignore: Object is possibly 'null'.
      var viewport = scrollTop + ul?.offsetHeight;
      var elOffset = elHeight * selected_index;

      // console.log('select', selected, ' viewport', viewport, ' elOffset', elOffset);
        // @ts-ignore: Object is possibly 'null'.

      if (elOffset < scrollTop || (elOffset + elHeight) > viewport)
        // @ts-ignore: Object is possibly 'null'.

        ul.scrollTop = elOffset;

      var selectedEl = document.querySelector('li.selected');
      if (selectedEl){
        selectedEl.classList.remove('selected');
        selectedEl.classList.remove('bg-secondary-g-50');
      }
      el.classList.add('selected');
      el.classList.add('bg-secondary-g-50');
    }

    return () => {
      document.removeEventListener('keydown',handleKeyDown);
    }

  },[datas])


  return (
    <div className={clsx('font-medium my-auto max-w-full min-w-40 mx-auto relative w-full', disabled ? "pointer-events-none cursor-not-allowed text-gray-400" : "cursor-pointer", !openProp && 'cursor-not-allowed')} ref={dropDownList} >
      <div
        onClick={() => setOpen(!open)}
        className={clsx('bg-white relative text-sm w-full pl-3 pr-5 font-normal flex items-center border min-h-9 md:min-h-10 rounded-md', error ? "border-status-danger-800" : "border-gray-200", selected && 'py-2', !selected && 'font-normal text-gray-400', !openProp && 'text-gray-400', open && openProp && "shadow-input-ring")}
      >
        {!!flag && (
          <img
            className="h-6 w-7 mr-2"
            src={flag}
            alt={`flag`}
          />
        )}{selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder={placeholder}
            className="placeholder:text-inherit rounded-full font-normal text-sm border-none first-letter:outline-none focus:outline-none focus:ring-0 focus:border-none w-11/12"
          />}

        <MdClose
          onClick={(e) => {
            if (!openProp) return;
            e.stopPropagation();
            setInputValue("");
            setSelected("");
            setFlag("");
            onChangeValue("")
          }}
          className={clsx("text-primary-o-600 absolute right-0 mr-2", (selected && openProp) ? "block" : "hidden")}
        />

        <BiChevronDown size={20} className={clsx(open && openProp && "rotate-180", "absolute right-0 mr-2 text-inherit", !openProp && 'text-gray-200', selected && "hidden")} />
      </div>
      <ul
        id="workspace-custom-ul"
        className={`bg-white mt-1 px-3 overflow-y-auto z-40 border absolute w-full rounded-md scrollbar ${((inputValue.length > 0 || open) && openProp) ? "max-h-60 block" : "hidden max-h-0 border-none"}`}
      >

        {datas ? (
          datas?.map((data: any, index: number) => (
            <li
              key={data?.id}
              className={`p-2 text-sm flex items-center gap-1 rounded-md ${data?.name?.toLowerCase() != selected?.toLowerCase() ? "cursor-pointer hover:bg-secondary-g-50" : "cursor-not-allowed"} font-normal  text-gray-500
            ${data?.name?.toLowerCase() === selected?.toLowerCase() &&
                "bg-blue-secondary-g-50"
                }
            ${data?.name?.toLowerCase()?.startsWith(inputValue)
                  ? "block"
                  : "hidden"
                }`}
              onClick={() => {
                if (data?.name?.toLowerCase() !== selected?.toLowerCase()) {
                  setSelected(data?.name);
                  setFlag(data?.icon)
                  setOpen(false);
                  setInputValue("");
                }
                onChangeValue(data);
              }}
              title={data?.name}
              data-flag={JSON.stringify({data:data??{}})}
              id="workspace-custom-li"
            >
              {
                imageRef?.[index] == "loading" && !!flagIcon && <span className="animate-pulse w-7 h-5 rounded-md shrink-0 bg-slate-200"></span>
              }
              {!!data?.icon && (
                <img
                  className={clsx("h-5 w-7", imageRef?.[index] == "loading" && 'hidden')}
                  key={data?.name}
                  src={data?.icon}
                  alt={`${data?.name}-flag`}
                  onLoad={() => {
                    if (!flagIcon) return;
                    setImageRef((pState: string[]) => {
                      if (Array.isArray(pState) && !!pState) {
                        let refArr = [...pState];
                        refArr[index] = "loaded"
                        return refArr;
                      }
                      return pState;
                    })
                  }}
                />
              )}
              <p className="line-clamp-1 w-max">{data?.name}</p>
            </li>
          ))
        ) :  
          isLoader ? (
            <div className="w-full text-center flex justify-center p-2">
              <div className="loader"></div>
            </div>
          ) : (
            <p className="text-center py-2 text-gray-400">Data not found</p>
        )
        }
        {
          Array.isArray(datas) && datas?.filter(d => d?.name?.toLowerCase()?.startsWith(inputValue))?.length == 0 &&
          <p className="text-center text-sm py-4 text-gray-500">Data not found</p>
        }
      </ul>
      {error && (
        <div className="text-status-danger-800 text-left text-xs  pl-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default SelectDropDown