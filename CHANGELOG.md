# Change Log

All notable changes to the "vscodefileheader" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.9.1] - 2021-07-06

### Fixed
- Fix insert template bug

## [0.9.0] - 2021-04-25
### Added

- Add create/open template

### Fixed

- Fix template bug
- Fix ignore bug

### Changed

- Refactor code structure

## [0.8.0] - 2021-03-18
### Added

- Add case conversion support
- Add template function replace
- Add C language header file template
- Add support for wildcard * template mapping
- Add template inheritance

## [0.7.0] - 2021-03-11
### Added

- Add ``Dart`` language template

### Changed

- Update header only file has been modified
- Use file creation date as the ``create_time``
- Update template style

## [0.6.1] - 2020-11-28
### Fixed

- Fix custom template bug(#9)

## [0.6.0] - 2020-11-17
### Added

- Support remote synchronization
- Add keywords ``header_max_line`` and `is_header_exists`` to the configuration file

## [0.5.1] - 2020-09-28
### Fixed

- ignore file, if the file header comment exists, it will be updated

## [0.5.0] - 2020-06-28
### Added

- [Support vscode variables](https://code.visualstudio.com/docs/editor/variables-reference)

## [0.4.1] - 2020-03-14
### Fixed

- Support vscode 1.43.0

## [0.4.0] - 2020-01-03
### Added

- If exists ``# -*- coding: utf-8 -*-``, first delete and insert python header comment.
- Add rust template
- Add php tail tag, body is not opened

### Changed

- Update template format
- Update ignore achieve
- Update function comment

## [0.3.2] - 2019-12-26
### Fixed

- When the editor does not have enough lines, find the line number error

## [0.3.1] - 2019-12-26
### Fixed

- Fix php tag bug (#1)

## [0.3.0] - 2019-12-6
### Added

- Add custom template header field mapping

## [0.2.7] - 2019-12-5
### Fixed

- Update php-template

## [0.2.6] - 2019-11-20
### Fixed

- First match file name and suffix.

## [0.2.0] - 2019-11-4
### Added

- Add ``TypeScript`` comment
- Add ``Vue`` comment
- Add manual and automatic insert comment

## [0.1.0] - 2019-8-31
### Added

- Add automatic update time and author
- Add custom template(header/body)
- Add suffix name mapping templates
- Add ignore suffix

[unreleased]: https://github.com/caizhengxin/vscodefileheader/compare/v0.9.1...HEAD
[0.9.1]: https://github.com/caizhengxin/vscodefileheader/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/caizhengxin/vscodefileheader/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/caizhengxin/vscodefileheader/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/caizhengxin/vscodefileheader/compare/v0.6.1...v0.7.0
[0.6.1]: https://github.com/caizhengxin/vscodefileheader/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/caizhengxin/vscodefileheader/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/caizhengxin/vscodefileheader/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/caizhengxin/vscodefileheader/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/caizhengxin/vscodefileheader/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/caizhengxin/vscodefileheader/compare/v0.3.2...v0.4.0
[0.3.2]: https://github.com/caizhengxin/vscodefileheader/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/caizhengxin/vscodefileheader/compare/v0.2.7...v0.3.1
[0.2.7]: https://github.com/caizhengxin/vscodefileheader/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/caizhengxin/vscodefileheader/compare/v0.2.3...v0.2.6
[0.2.0]: https://github.com/caizhengxin/vscodefileheader/compare/v0.1.8...v0.2.1
[0.1.0]: https://github.com/caizhengxin/vscodefileheader/compare/v0.0.2...v0.1.5
