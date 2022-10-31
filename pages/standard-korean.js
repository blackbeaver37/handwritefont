import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Navbar from "components/Navbar";
import Head from "next/head";
import styles from "styles/Standard-Korean.module.scss";
import { useCallback, useReducer, useRef, useState } from "react";
import DropZone from "../components/DropZone";

const StandardKorean = () => {
    const [page, setPage] = useState(0);
    const lastPage = 2;

    const handlePageNext = () => {
        if (page < lastPage) {
            setPage(page + 1);
        }
    };
    const handlePagePrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    // reducer function to handle state changes
    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_IN_DROP_ZONE":
                return { ...state, inDropZone: action.inDropZone };
            case "ADD_FILE_TO_LIST":
                return {
                    ...state,
                    fileList: state.fileList.concat(action.files),
                };
            default:
                return state;
        }
    };

    // destructuring state and dispatch, initializing fileList to empty array
    const [data, dispatch] = useReducer(reducer, {
        inDropZone: false,
        fileList: [],
    });

    return (
        <div>
            <Head>
                <title>Title</title>
                <meta name="Name" content="Content" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.block}>
                    {page == 0 && <span>주의사항</span>}
                    {page == 1 && (
                        <a
                            className={styles.download}
                            href="/손글씨작성템플릿.pdf"
                            download
                        >
                            템플릿 다운로드
                        </a>
                    )}
                    {page == 2 && (
                        <div className={styles.dropzone_div}>
                            <DropZone data={data} dispatch={dispatch} />
                        </div>
                    )}
                </div>
                <div>
                    {page > 0 && <button onClick={handlePagePrev}>이전</button>}
                    {page < lastPage && (
                        <button onClick={handlePageNext}>다음</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StandardKorean;
