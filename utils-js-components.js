(function($) {
    'use strict';
    
    var UtilsJsComponents = {
        // Main initialization
        init: function() {
            this.targetToggle_init();
            this.passwordToggle_init();
            this.showMore_init();
            this.loadMore_init();
            this.copyToClipboard_init();
        },
        
        // ==========================================
        // FEATURE: Target Toggle
        // ==========================================
        targetToggle_init: function() {
            var self = this;
            
            $(document).on('click', '[ujs-target-id]', function(e) {
                e.preventDefault();
                var $btn = $(this);
                var targetId = $btn.attr('ujs-target-id');
                var $target = $(targetId);
                var toggleClass = $btn.attr('ujs-toggle-class');
                var useFade = $btn.attr('ujs-anim-fade') !== undefined;
                var duration = parseInt($btn.attr('ujs-anim-duration')) || 300;
                var btnActiveClass = $btn.attr('ujs-btn-active-class') || 'active';
                
                // Determine if target will be visible after toggle
                var willBeVisible;
                if (toggleClass) {
                    willBeVisible = $target.hasClass(toggleClass);
                } else {
                    willBeVisible = !$target.is(':visible');
                }
                
                // Toggle button active class
                if (willBeVisible) {
                    $btn.addClass(btnActiveClass);
                } else {
                    $btn.removeClass(btnActiveClass);
                }
                
                // Toggle target
                if (useFade) {
                    self.targetToggle_withFade($target, toggleClass, duration);
                } else {
                    self.targetToggle_instant($target, toggleClass);
                }
            });
        },
        
        targetToggle_withFade: function($target, toggleClass, duration) {
            duration = duration || 300;
            
            if (toggleClass) {
                // Toggle class-based visibility with fade
                if ($target.hasClass(toggleClass)) {
                    // Currently hidden, show it
                    $target.css('opacity', 0).removeClass(toggleClass);
                    $target.animate({opacity: 1}, duration);
                } else {
                    // Currently visible, hide it
                    $target.animate({opacity: 0}, duration, function() {
                        $target.addClass(toggleClass).css('opacity', '');
                    });
                }
            } else {
                // Toggle inline display with fade
                if ($target.is(':visible')) {
                    $target.fadeOut(duration);
                } else {
                    $target.fadeIn(duration);
                }
            }
        },
        
        targetToggle_instant: function($target, toggleClass) {
            if (toggleClass) {
                $target.toggleClass(toggleClass);
            } else {
                if ($target.css('display') === 'none') {
                    $target.css('display', '');
                } else {
                    $target.css('display', 'none');
                }
            }
        },
        
        // ==========================================
        // FEATURE: Password Show/Hide
        // ==========================================
        passwordToggle_init: function() {
            var self = this;
            
            // Setup all password inputs with the attribute
            $('[ujs-pass-show-hide]').each(function() {
                self.passwordToggle_setup($(this));
            });
			
			// in order for the ajax loaded content inputs to be taken into account there are 2 options:
			// # Option 1: call UtilsJsComponents.passwordToggle_reinit(); like so:
			// $('#myModal').on('shown.bs.modal', function() {
				// UtilsJsComponents.passwordToggle_reinit();
			// });
			// # Option 2
			// Watch for new password inputs added to DOM
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					// Check added nodes
					$(mutation.addedNodes).each(function() {
						if ($(this).is('[ujs-pass-show-hide]')) {
							// Direct match
							self.passwordToggle_setup($(this));
						}
						// Check children
						$(this).find('[ujs-pass-show-hide]').each(function() {
							self.passwordToggle_setup($(this));
						});
					});
				});
			});
			// Start observing the document body
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
        },
		
		// this is only needed if not using the MutationObserver Option in the passwordToggle_init()
		passwordToggle_reinit: function() {
			var self = this;
			
			// Find all password inputs with the attribute
			$('[ujs-pass-show-hide]').each(function() {
				// Check if already setup to avoid duplicates
				if (!$(this).data('ujs-password-setup')) {
					self.passwordToggle_setup($(this));
				}
			});
		},
        
        passwordToggle_setup: function($input) {
            var self = this;
            
			// Check if already setup (prevent duplicates)
			if ($input.data('ujs-password-setup')) {
				return;
			}
			$input.data('ujs-password-setup', true);
			
            // Get custom button classes
            var customBtnClass = $input.attr('ujs-pass-btn-class') || '';
            var btnClass = 'pass-eye' + (customBtnClass ? ' ' + customBtnClass : '');
            
            // Check if already wrapped
            if ($input.parent().hasClass('password-toggle-wrapper')) {
                return; // Already setup
            }
            
            // Wrap the input
            $input.wrap('<div class="password-toggle-wrapper" style="position: relative; display: inline-block; width: 100%;"></div>');
			
			// Find and move feedback elements into wrapper
			var $wrapper = $input.parent('.password-toggle-wrapper');
			var $invalidFeedback = $input.next('.invalid-feedback');
			var $validFeedback = $input.next('.valid-feedback');

			if ($invalidFeedback.length) {
				$wrapper.append($invalidFeedback);
			}
			if ($validFeedback.length) {
				$wrapper.append($validFeedback);
			}
            
            // Create toggle button with icons
            var $button = $('<button type="button" class="' + btnClass + '" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); border: none; background: transparent; cursor: pointer; padding: 5px;"></button>');
            
            // Create eye icons (using Bootstrap Icons by default)
            var $eyeOff = $('<i class="bi bi-eye"></i>');
            var $eyeOn = $('<i class="bi bi-eye-slash" style="display: none;"></i>');
            
            $button.append($eyeOff).append($eyeOn);
            
            // Insert button after input
            $input.after($button);
            
            // Adjust input padding to make room for button
            var inputPaddingRight = parseInt($input.css('padding-right')) || 0;
            $input.css('padding-right', (inputPaddingRight + 35) + 'px');
            
            // Attach click handler
            $button.on('click', function(e) {
                e.preventDefault();
                self.passwordToggle_toggle($input, $button);
            });
        },
        
        passwordToggle_toggle: function($input, $button) {
            var currentType = $input.attr('type');
            var $eyeOff = $button.find('.bi-eye');
            var $eyeOn = $button.find('.bi-eye-slash');
            
            if (currentType === 'password') {
                // Show password
                $input.attr('type', 'text');
                $eyeOff.hide();
                $eyeOn.show();
            } else {
                // Hide password
                $input.attr('type', 'password');
                $eyeOff.show();
                $eyeOn.hide();
            }
        },
        
        // ==========================================
        // FEATURE: Show More / Show Less
        // ==========================================
        showMore_init: function() {
            var self = this;
            
            // Setup all content boxes with the attribute
            $('[ujs-show-more-content]').each(function() {
                self.showMore_setup($(this));
            });
            
            $(document).on('click', '[ujs-show-more-target]', function(e) {
                e.preventDefault();
                self.showMore_toggle($(this));
            });
        },
        
        showMore_setup: function($content) {
            // Check if already setup (prevent duplicates)
            if ($content.data('ujs-show-more-setup')) {
                return;
            }
            $content.data('ujs-show-more-setup', true);
            
            var height = parseInt($content.attr('ujs-show-more-height')) || 150;
            var fadeColor = $content.attr('ujs-show-more-fade-color') || '#fff';
            
            $content.css({
                'position': 'relative',
                'overflow': 'hidden',
                'max-height': height + 'px'
            });
            
            $content.data('ujs-show-more-collapsed-height', height);
            $content.data('ujs-show-more-expanded', false);
            
            // Fade overlay to hint there's more content below
            var $overlay = $('<div class="ujs-show-more-overlay"></div>').css({
                'position': 'absolute',
                'bottom': 0,
                'left': 0,
                'right': 0,
                'height': '50px',
                'background': 'linear-gradient(to bottom, rgba(255,255,255,0), ' + fadeColor + ')',
                'pointer-events': 'none'
            });
            
            $content.append($overlay);
            $content.data('ujs-show-more-overlay', $overlay);
        },
        
        showMore_toggle: function($btn) {
            var targetSelector = $btn.attr('ujs-show-more-target');
            var $target = $(targetSelector);
            
            if (!$target.length) {
                return;
            }
            
            var useFade = $btn.attr('ujs-anim-fade') !== undefined;
            var duration = parseInt($btn.attr('ujs-anim-duration')) || 300;
            var textMore = $btn.attr('ujs-show-more-text') || 'Show More';
            var textLess = $btn.attr('ujs-show-more-text-less') || 'Show Less';
            var btnActiveClass = $btn.attr('ujs-btn-active-class') || 'active';
            
            var collapsedHeight = $target.data('ujs-show-more-collapsed-height');
            var $overlay = $target.data('ujs-show-more-overlay');
            var isExpanded = $target.data('ujs-show-more-expanded') === true;
            
            if (!isExpanded) {
                // Expand to show full content
                var fullHeight = $target[0].scrollHeight;
                
                if (useFade) {
                    $target.stop().animate({ 'max-height': fullHeight }, duration);
                    if ($overlay) {
                        $overlay.stop().fadeOut(duration);
                    }
                } else {
                    $target.stop().css('max-height', fullHeight + 'px');
                    if ($overlay) {
                        $overlay.hide();
                    }
                }
                
                $btn.text(textLess).addClass(btnActiveClass);
                $target.data('ujs-show-more-expanded', true);
            } else {
                // Collapse back to original height
                if (useFade) {
                    $target.stop().animate({ 'max-height': collapsedHeight }, duration);
                    if ($overlay) {
                        $overlay.stop().fadeIn(duration);
                    }
                } else {
                    $target.stop().css('max-height', collapsedHeight + 'px');
                    if ($overlay) {
                        $overlay.show();
                    }
                }
                
                $btn.text(textMore).removeClass(btnActiveClass);
                $target.data('ujs-show-more-expanded', false);
            }
        },
        
        // ==========================================
        // FEATURE: Load More (next X items)
        // ==========================================
        loadMore_init: function() {
            var self = this;
            
            // Setup all containers with the attribute
            $('[ujs-load-more-container]').each(function() {
                self.loadMore_setup($(this));
            });
            
            $(document).on('click', '[ujs-load-more-target]', function(e) {
                e.preventDefault();
                self.loadMore_reveal($(this));
            });
        },
        
        loadMore_setup: function($container) {
            // Check if already setup (prevent duplicates)
            if ($container.data('ujs-load-more-setup')) {
                return;
            }
            $container.data('ujs-load-more-setup', true);
            
            var initial = parseInt($container.attr('ujs-load-more-initial')) || 5;
            var $items = $container.children();
            
            $items.each(function(index) {
                if (index >= initial) {
                    $(this).hide();
                }
            });
        },
        
        loadMore_reveal: function($btn) {
            var targetSelector = $btn.attr('ujs-load-more-target');
            var $container = $(targetSelector);
            
            if (!$container.length) {
                return;
            }
            
            var step = parseInt($container.attr('ujs-load-more-step')) || 5;
            var useFade = $btn.attr('ujs-anim-fade') !== undefined;
            var duration = parseInt($btn.attr('ujs-anim-duration')) || 300;
            var textDone = $btn.attr('ujs-load-more-text-done') || 'No more items';
            
            var $hiddenItems = $container.children(':hidden');
            var $toShow = $hiddenItems.slice(0, step);
            
            if (useFade) {
                $toShow.fadeIn(duration);
            } else {
                $toShow.show();
            }
            
            var remaining = $hiddenItems.length - $toShow.length;
            
            if (remaining <= 0) {
                $btn.prop('disabled', true).text(textDone);
            }
        },
        
        // ==========================================
        // FEATURE: Copy to Clipboard
        // ==========================================
        copyToClipboard_init: function() {
            var self = this;
            
            $(document).on('click', '[ujs-copy-target], [ujs-copy-value]', function(e) {
                e.preventDefault();
                self.copyToClipboard_copy($(this));
            });
        },
        
        copyToClipboard_copy: function($btn) {
            var self = this;
            var textToCopy = '';
            
            var targetSelector = $btn.attr('ujs-copy-target');
            
            if (targetSelector) {
                var $target = $(targetSelector);
                
                if ($target.length) {
                    // Works for visible AND hidden inputs/textareas
                    if ($target.is('input, textarea')) {
                        textToCopy = $target.val();
                    } else {
                        // Plain text only (no HTML) for divs, paragraphs, etc.
                        textToCopy = $target.text().trim();
                    }
                }
            } else {
                // Fallback to a literal value defined on the button itself
                textToCopy = $btn.attr('ujs-copy-value') || '';
            }
            
            self.copyToClipboard_writeText(textToCopy, function(success) {
                self.copyToClipboard_showFeedback($btn, success);
            });
        },
        
        copyToClipboard_writeText: function(text, callback) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function() {
                    callback(true);
                }).catch(function() {
                    callback(false);
                });
            } else {
                // Fallback for older browsers / non-secure contexts
                var $temp = $('<textarea></textarea>').val(text).css({
                    position: 'fixed',
                    left: '-9999px',
                    top: '0'
                });
                
                $('body').append($temp);
                $temp[0].select();
                
                var success = false;
                try {
                    success = document.execCommand('copy');
                } catch (e) {
                    success = false;
                }
                
                $temp.remove();
                callback(success);
            }
        },
        
        copyToClipboard_showFeedback: function($btn, success) {
            if (!success) {
                return;
            }
            
            var successText = $btn.attr('ujs-copy-success-text') || 'Copied!';
            var duration = parseInt($btn.attr('ujs-copy-success-duration')) || 2000;
            
            // Remember the original text only once
            if (!$btn.data('ujs-copy-original-text')) {
                $btn.data('ujs-copy-original-text', $btn.text());
            }
            
            var originalText = $btn.data('ujs-copy-original-text');
            
            $btn.text(successText);
            
            clearTimeout($btn.data('ujs-copy-timeout'));
            var timeoutId = setTimeout(function() {
                $btn.text(originalText);
            }, duration);
            $btn.data('ujs-copy-timeout', timeoutId);
        }
    };
    
    // Auto-initialize on document ready
    $(document).ready(function() {
        UtilsJsComponents.init();
    });
    
    // Expose to window for manual init if needed
    window.UtilsJsComponents = UtilsJsComponents;
    
})(jQuery);