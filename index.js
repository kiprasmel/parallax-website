/**
 * @function allignElements
 * @desc dynamically set the height of `ptext` elements (completely center them)
 *
 * `element.clientHeight` vs `element.offsetHeight`:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
 */
const allignElements = () => {
	let ptexts = document.querySelectorAll(".ptext");
	const halfDocumentHeight = document.body.offsetHeight / 2;

	ptexts.forEach((ptext) => {
		const styles = window.getComputedStyle(ptext);
		let height =
			ptext.offsetHeight + parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

		let top = halfDocumentHeight - height / 2;
		let topPercent = (top / document.body.offsetHeight) * 100;
		ptext.style.top = (topPercent + "%").toString();

		console.log(
			"height",
			height,
			"offsetHeight",
			document.body.offsetHeight,
			"top",
			top,
			"ptext.style.top (%)",
			ptext.style.top
		);
	});
};

allignElements();

/** handle resizing: */

let busy = false;
let calledAgain = false;
const howLongToThrottle = 66; /** every 15fps, apparently */

const resizeThrottler = () => {
	if (!busy) {
		busy = true;
		calledAgain = false;
		allignElements();

		/**
		 * `setTimeout` prevents `allignElements` calls for `howLongToThrottle` miliseconds.
		 * if another resize event happened, we'll resize after the timeout (using `calledAgain`).
		 */
		setTimeout(() => {
			busy = false;
			if (calledAgain) {
				allignElements();
			}
			calledAgain = false;
		}, howLongToThrottle);
	} else {
		calledAgain = true;
	}
};

/**
 * `resize` docs: https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
window.addEventListener("resize", resizeThrottler, false);
