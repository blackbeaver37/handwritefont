import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faA, faPen, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import Navbar from "components/Navbar";
import Head from "next/head";
import styles from "styles/Standard-Korean.module.scss";
import { useCallback, useReducer, useRef, useState } from "react";
import DropZone from "components/DropZone";
import classNames from "classnames";
import { useRouter } from "next/router";

import ReactCrop from "react-image-crop";
import FilePreview from "components/FilePreview";

const StandardKorean = () => {
    const router = useRouter();
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

    const [crop, setCrop] = useState({ aspect: 16 / 9 });

    const onClickTest = () => {
        const file = data.fileList[0];
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
                    {page === 0 && (
                        <div className={styles.pageDiv}>
                            <span className={styles.pageHeader}>?????? ??????</span>
                            <div className={styles.page1DescDiv}>
                                <div className={styles.pageDescDiv}>
                                    <div>
                                        <FontAwesomeIcon icon={faPen} />
                                    </div>
                                    <span>
                                        &nbsp;????????? ?????? ??? 0.7mm ?????????
                                        <br />
                                        ????????? ?????? ????????? ?????????.
                                    </span>
                                </div>
                                <div className={styles.pageDescDiv}>
                                    <div>
                                        <FontAwesomeIcon icon={faA} />
                                    </div>
                                    <span>
                                        &nbsp;????????? ?????? ????????? ????????? ??????
                                        <br />
                                        ????????? ??? ????????? ?????????.
                                    </span>
                                </div>
                                <div className={styles.pageDescDiv}>
                                    <div>
                                        <FontAwesomeIcon icon={faSquareCheck} />
                                    </div>
                                    <span>
                                        &nbsp;????????? ??? ?????? ????????? ?????????
                                        <br />
                                        ?????? ??????????????????.
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    {page === 1 && (
                        <div className={styles.pageDiv}>
                            <span className={styles.pageHeader}>
                                ????????? ??????
                            </span>
                            <div className={styles.pageDesc}>
                                <span>
                                    ?????? ???????????? ?????????????????? ????????????
                                    ??????????????????.
                                </span>
                            </div>
                            <a
                                className={styles.download}
                                href="/????????????????????????.pdf"
                                download
                            >
                                ????????? ????????????
                            </a>
                        </div>
                    )}
                    {page === 2 && (
                        <div className={styles.pageDiv}>
                            <span className={styles.pageHeader}>
                                ????????? ?????????
                            </span>
                            <div className={styles.pageDesc}>
                                <span>
                                    ????????? ????????? ????????? ???????????? ?????????
                                    ????????????.
                                </span>
                            </div>
                            <div className={styles.dropzoneDiv}>
                                <DropZone data={data} dispatch={dispatch} />
                            </div>
                            {/* <img height={200} src="test.png" /> */}
                        </div>
                    )}
                    {page === 3 && (
                        <div className={styles.pageDiv}>
                            <span className={styles.pageHeader}>??????</span>
                            <div className={styles.pageDesc}></div>
                            <FilePreview fileData={data} />
                        </div>
                    )}
                </div>
                <div className={styles.progressDiv}>
                    <div
                        className={classNames(styles.progressDiv_element, {
                            [styles.progressDiv_element_active]: page === 0,
                        })}
                    >
                        ?????? ??????
                    </div>
                    <div className={styles.dot}>&#8226; &#8226; &#8226;</div>
                    <div
                        className={classNames(styles.progressDiv_element, {
                            [styles.progressDiv_element_active]: page === 1,
                        })}
                    >
                        ????????? ??????
                    </div>
                    <div className={styles.dot}>&#8226; &#8226; &#8226;</div>
                    <div
                        className={classNames(styles.progressDiv_element, {
                            [styles.progressDiv_element_active]: page === 2,
                        })}
                    >
                        ????????? ?????????
                    </div>
                    <div className={styles.dot}>&#8226; &#8226; &#8226;</div>
                    <div
                        className={classNames(styles.progressDiv_element, {
                            [styles.progressDiv_element_active]: page === 3,
                        })}
                    >
                        ??????
                    </div>
                </div>
                <div>
                    {page === 0 ? (
                        <button
                            className={classNames(
                                styles.pageBtn,
                                styles.pageBtn_prev
                            )}
                            onClick={() => router.push("/getStart")}
                        >
                            ?????? ????????????
                        </button>
                    ) : (
                        <button
                            className={classNames(
                                styles.pageBtn,
                                styles.pageBtn_prev
                            )}
                            onClick={handlePagePrev}
                        >
                            &#60; ?????? ?????????
                        </button>
                    )}
                    {page === lastPage ? (
                        <button
                            className={classNames(
                                styles.pageBtn,
                                styles.pageBtn_next
                            )}
                            // onClick={handlePageNext}
                        >
                            ?????? ??????
                        </button>
                    ) : (
                        <button
                            className={classNames(
                                styles.pageBtn,
                                styles.pageBtn_next
                            )}
                            onClick={handlePageNext}
                        >
                            ?????? ????????? &#62;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StandardKorean;
