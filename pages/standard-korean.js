import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Navbar from "components/Navbar";
import Head from "next/head";
import styles from "styles/Standard-Korean.module.scss";
import { useCallback, useReducer, useRef, useState } from "react";
import DropZone from "../components/DropZone";
import classNames from "classnames";

const StandardKorean = () => {
    const [page, setPage] = useState(0);
    const lastPage = 3;

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

    const onClickTest = () => {
        const url = window.URL.createObjectURL(data.fileList[0]);
        window.alert(url);
        window.URL.revokeObjectURL(url);
    };

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
                        <div className={styles.dropzoneDiv}>
                            <DropZone data={data} dispatch={dispatch} />
                        </div>
                    )}
                    {page == 3 && (
                        <div>
                            <span>완료</span>
                            <button onClick={onClickTest}>TEST</button>
                        </div>
                    )}
                </div>
                <div className={styles.progressDiv}>
                    <div
                        className={classNames(styles.progressDiv_element, {
                            [styles.progressDiv_element_active]: page == 0,
                        })}
                    >
                        주의사항
                    </div>
                    <div
                        className={classNames(styles.progressDiv_element, {
                            [styles.progressDiv_element_active]: page == 1,
                        })}
                    >
                        템플릿 작성
                    </div>
                    <div
                        className={classNames(styles.progressDiv_element, {
                            [styles.progressDiv_element_active]: page == 2,
                        })}
                    >
                        손글씨 업로드
                    </div>
                    <div
                        className={classNames(styles.progressDiv_element, {
                            [styles.progressDiv_element_active]: page == 3,
                        })}
                    >
                        완료
                    </div>
                </div>
                <div>
                    <button
                        className={classNames(styles.pageBtn, {
                            [styles.pageBtn_op0]: page == 0,
                        })}
                        onClick={handlePagePrev}
                        disabled={page == 0}
                    >
                        이전
                    </button>
                    <button
                        className={classNames(styles.pageBtn, {
                            [styles.pageBtn_op0]: page == lastPage,
                        })}
                        onClick={handlePageNext}
                        disabled={page == lastPage}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StandardKorean;
