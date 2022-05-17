<?php
if (!isset($current) || empty($current)){
	$current = '';
}
?>
<header id="l-header" class="l-header <?php if (isset($is_simple)) echo 'is-header-simple' ?>">
	<div class="l-header__wrapper">
<?php
$html = '<a href="/"><img src="/assets/images/logo-site.svg" alt="★★★"></a>';
if($current == 'home'){
	echo('<h1 id="sitelogo">' . $html . '</h1>');
}else{
	echo('<p id="sitelogo">' . $html . '</p>');
}
?>

<?php if (!isset($is_simple)){ ?>
		<a class="nav-global-menu">
			<span class="b1" aria-hidden="true"></span>
			<span class="b2" aria-hidden="true"></span>
			<span class="b3" aria-hidden="true"></span>
		</a>
		<nav class="nav-global-wrap">
			<ul class="nav-global">
				<li class="nav-global-wrap_lv1"<?php if ($current == '★★★') echo ' class="current "' ?>><a href="★★★" class="nav-item"  data-text="Home">Home</a>
					<div class="nav-parent-wrap">
						<div class="nav-parent">
							<p class="nav-parent__title"><a href="★★★">Link 1</a></p>
							<ul class="nav-global__sub">
								<li><a href="★★★" class="nav-global__sub__title">Item 1</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
									</ul>
								</li>
								<li><a href="★★★" class="nav-global__sub__title">Item 2</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">5</a></li>
										<li><a href="★★★">5</a></li>
										<li><a href="★★★">5</a></li>
										<li><a href="★★★">5</a></li>
									</ul>
								</li>
								<li><a href="★★★" class="nav-global__sub__title">Item 3</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">1</a></li>
										<li><a href="★★★">2</a></li>
										<li><a href="★★★">3</a></li>
										<li><a href="★★★">4</a></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li class="nav-global-wrap_lv1" <?php if ($current == '★★★') echo ' class="current"' ?>><a href="★★★" class="nav-item" data-text="About">About</a>
					<div class="nav-parent-wrap">
						<div class="nav-parent">
							<p class="nav-parent__title"><a href="★★★">Link 2</a></p>
							<ul class="nav-global__sub">
								<li><a href="★★★" class="nav-global__sub__title">Item 1</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
									</ul>
								</li>
								<li><a href="★★★" class="nav-global__sub__title">Item 2</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
									</ul>
								</li>
								<li><a href="★★★" class="nav-global__sub__title">Item 3</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
									</ul>
								</li>
								<li><a href="★★★">Item 4</a></li>
								<li><a href="★★★">Item 5</a></li>
							</ul>
						</div>
					</div>
				</li>
				<li  class="nav-global-wrap_lv1" <?php if ($current == '★★★') echo ' class="current"' ?>><a href="★★★" data-text="Services">Services</a></li>
				<li class="nav-global-wrap_lv1" <?php if ($current == '★★★') echo ' class="current"' ?>><a href="★★★" data-text="Team">Team</a></li>
				<li  class="nav-global-wrap_lv1" <?php if ($current == '★★★') echo ' class="current"' ?>><a href="★★★" class="nav-item" data-text="Contact">Contact</a>
					<div class="nav-parent-wrap">
						<div class="nav-parent">
							<p class="nav-parent__title"><a href="★★★">Link 5</a></p>
							<ul class="nav-global__sub">
								<li><a href="★★★" class="nav-global__sub__title">Item 1</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
									</ul>
								</li>
								<li><a href="★★★" class="nav-global__sub__title">Item 2</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
									</ul>
								</li>
								<li><a href="★★★" class="nav-global__sub__title">Item 3</a>
									<ul class="nav-global__sub__child">
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
										<li><a href="★★★">ダミーテキスト</a></li>
									</ul>
								</li>
								<li><a href="★★★">Item 4</a></li>
								<li><a href="★★★">Item 5</a></li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</nav>
	</div>
<?php } ?>
</header>