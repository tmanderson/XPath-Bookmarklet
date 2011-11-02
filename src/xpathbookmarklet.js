window.onload = function() {
(function() {
	var els = document.getElementsByTagName('*'),
		bPad = window.getComputedStyle(document.body, null).paddingLeft,
		out = document.createElement('div'),
		output = false,
		start = new Date().getTime();
		
	out.setAttribute('style', 'background-color: #EEE; border-bottom: 2px solid #AAA; font-family: helvetica, sans-serif; color: #777; font-size: 16px; -webkit-box-shadow: 0px 5px 10px rgba(33, 33, 33, .7); position: fixed; height: 20px; top: 0px; left: ' + bPad + '; width: 100%; text-align: center; padding: 10px; opacity: .01; z-index: 99999999');
	out.id = 'pki-xpath-output';
	out.innerHTML = "<b>Hold down shift and hover over a node to view it's XPath.</b>";
	document.body.style.marginTop = window.getComputedStyle(document.body, null).paddingTop;
	document.body.appendChild(out);
	
	var bodyMargin = setInterval(function() {
		var top = parseInt(document.body.style.marginTop) + 1,
			t = new Date().getTime() - start;
		if(parseInt(document.body.style.marginTop) < 60) {
			document.body.style.marginTop = top + (top * .09) + 'px';
			out.style.opacity = out.style.opacity * 1.2;
		} else {
			Math.floor(out.style.opacity);
			clearInterval(bodyMargin);
		}
	}, 10);
	
	document.onkeydown = function(e) {
		if(e.keyCode && e.keyCode === 16 || e.shiftKey || e.keyIdentifier  && e.keyIdentifer === 'Shift') {
			output = true;
		}
	}
	
	document.onkeyup = function(e) {
		if(e.keyCode && e.keyCode === 16 || e.shiftKey || e.keyIdentifier  && e.keyIdentifer === 'Shift') {
			output = false;
		}
	}
	
	for(e in els) {
		if(!els[e].onmouseover) {
			els[e].onmouseover = function(e) {
				if(output === true) {
					var root = e.target,
						idx = undefined,
						tree = '';
					
					while(root.parentNode) {
						if(root.id === 'pki-xpath-output') return false;
						var nodes = root.parentNode.childNodes,
							nodeCount = 0,
							index = 1;
						
						if(root.id.length > 0) {
							tree += '//' + root.nodeName + '[@id=\'' + root.id + '\']';
							tree += tree.length > 0 ? '/' : '';
							out.innerHTML = '<b>' + tree.toLowerCase() + '</b>';
							return false;
						}

						for(n in nodes) {
							if(nodes[n].nodeName === root.nodeName) {
								nodeCount++;
								if(nodes[n] === root) {
									index = nodeCount;
								}
							}
						}
					
						if(nodeCount > 1) {
							tree = tree.length > 0 ? root.nodeName + '[' + index + ']/' + tree : root.nodeName + '[' + index + ']';
						} else {
							tree = tree.length > 0 ? root.nodeName + '/' + tree : root.nodeName;
						}
					
						root = root.parentNode;
					}
					
					out.innerHTML = '<b>' + tree.toLowerCase() + '</b>';
				}
				e.stopPropagation();
			}
		}
	}
})();
}